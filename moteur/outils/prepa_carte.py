"""PRÉPARE UNE CARTE pour le moteur (bibliothèque optionnelle, voir moteur/outils/README.md).
Lit Natural Earth (domaine public, https://www.naturalearthdata.com) et écrit une carte simplifiée en SVG (km, y vers le bas)
dans un fichier JS chargé par la page : CARTES['nom'] = {…}. À lancer AVANT le rendu, jamais pendant (aucun réseau au rendu).

  python3 moteur/outils/prepa_carte.py --nom anvers --centre 51.21,4.42 --large=-12,35,30,62 --detail=1,49,8,53 \\
      --villes "Antwerpen,Brussels,Gent,Diamond Centre=51.2143:4.4187" --sortie DOSSIER/outils/cartes.js
  python3 moteur/outils/prepa_carte.py --nom monde --projection monde --sortie moteur/outils/cartes/monde.js

Options : --large BOÎTE (pays en 1:50 M), --detail BOÎTE (pays en 1:10 M, pour zoomer sur une région ou une ville),
--admin1 FRA,BEL (limites intérieures : départements, provinces… en 1:10 M), --villes "Paris,Londres=London,Lieu=lat:lon",
--villes-auto N (les N plus grandes villes de la boîte de détail), --tol-large / --tol-detail (simplification, km).
BOÎTE = lonmin,latmin,lonmax,latmax (écrire --large=-12,35,30,62 avec « = » si la boîte commence par un « - »). Le fichier --sortie peut contenir plusieurs cartes (une ligne par carte, remplacée si
le nom existe déjà). Source des données : $LVC_NATURAL_EARTH ou /home/claude/outils-video/natural-earth-vector/geojson."""
import argparse, json, math, os, re, unicodedata
import numpy as np

NE = os.environ.get('LVC_NATURAL_EARTH', '/home/claude/outils-video/natural-earth-vector/geojson')
R = 6371.0


def projecteur(kind, lat0, lon0):
    if kind == 'monde':   # Equal Earth (Šavrič, Patterson, Jenny 2018), équivalente, pour le monde entier
        A1, A2, A3, A4, Mq = 1.340264, -0.081106, 0.000893, 0.003796, math.sqrt(3) / 2
        def p(lon, lat):
            dl = lon - lon0; dl = dl - 360 if dl > 180 else dl + 360 if dl < -180 else dl   # ±180 gardés (pas de trait à travers la carte)
            l = math.radians(dl); th = math.asin(Mq * math.sin(math.radians(lat)))
            t2 = th * th; t6 = t2 ** 3
            x = 2 * math.sqrt(3) * l * math.cos(th) / (3 * (9 * A4 * t6 * t2 + 7 * A3 * t6 + 3 * A2 * t2 + A1))
            y = A4 * t6 * t2 * th + A3 * t6 * th + A2 * t2 * th + A1 * th
            return (R * x, -R * y)
        return p
    p0, l0 = math.radians(lat0), math.radians(lon0)
    def p(lon, lat):      # azimutale équivalente de Lambert centrée sur (lat0, lon0), comme le pilote NC-001
        ph, l = math.radians(lat), math.radians(lon)
        c = 1 + math.sin(p0) * math.sin(ph) + math.cos(p0) * math.cos(ph) * math.cos(l - l0)
        k = math.sqrt(2 / max(c, 1e-9))
        return (R * k * math.cos(ph) * math.sin(l - l0), -R * k * (math.cos(p0) * math.sin(ph) - math.sin(p0) * math.cos(ph) * math.cos(l - l0)))
    return p


def anneaux(g):
    t, cs = g['type'], g['coordinates']
    return {'Polygon': lambda: cs, 'MultiPolygon': lambda: [r for p in cs for r in p], 'LineString': lambda: [cs],
            'MultiLineString': lambda: cs}.get(t, lambda: [])()


def dans(r, b):
    return b is None or any(b[0] <= x <= b[2] and b[1] <= y <= b[3] for x, y in r)


def simplifie(pts, tol):   # Douglas-Peucker (km)
    if len(pts) < 3 or tol <= 0:
        return pts
    a = np.array(pts); keep = np.zeros(len(a), bool); keep[0] = keep[-1] = True; st = [(0, len(a) - 1)]
    while st:
        i, j = st.pop()
        if j <= i + 1:
            continue
        d = a[j] - a[i]; n = math.hypot(*d); v = a[i + 1:j] - a[i]
        dist = np.hypot(v[:, 0], v[:, 1]) if n < 1e-9 else np.abs(d[0] * v[:, 1] - d[1] * v[:, 0]) / n
        k = int(np.argmax(dist))
        if dist[k] > tol:
            m = i + 1 + k; keep[m] = True; st += [(i, m), (m, j)]
    return [tuple(x) for x in a[keep]]


def chemin(rings, ferme, dec):
    out = []
    for r in rings:
        q = []
        for x, y in r:
            s = f'{x:.{dec}f},{y:.{dec}f}'
            if not q or q[-1] != s:
                q.append(s)
        if len(q) >= (3 if ferme else 2):
            out.append('M' + ' '.join(q) + ('Z' if ferme else ''))
    return ''.join(out)


def boite_xy(rings):
    xs = [x for r in rings for x, _ in r]; ys = [y for r in rings for _, y in r]
    return [round(min(xs), 1), round(min(ys), 1), round(max(xs), 1), round(max(ys), 1)] if xs else None


def sans_accent(s):
    return ''.join(c for c in unicodedata.normalize('NFD', str(s or '').lower()) if unicodedata.category(c) != 'Mn')


def couche_pays(fn, box, tol, P, dec, nom_fr):
    d = json.load(open(os.path.join(NE, fn)))
    out, centres, boites = {}, {}, {}
    for f in d['features']:
        pr = f['properties']; code = pr.get('ADM0_A3') or pr.get('ISO_A3')
        rs = [r for r in anneaux(f['geometry']) if dans(r, box)]
        if not rs:
            continue
        pj = [simplifie([P(x, y) for x, y in r], tol) for r in rs]
        dd = chemin(pj, True, dec)
        if not dd:
            continue
        out[code] = {'n': pr.get('NAME_FR') or pr.get('NAME'), 'd': dd}
        nom_fr[code] = pr.get('NAME_FR') or pr.get('NAME')
        if pr.get('LABEL_X') is not None:
            centres[code] = [round(v, 1) for v in P(pr['LABEL_X'], pr['LABEL_Y'])]
        big = max(pj, key=len)
        boites[code] = boite_xy([big])
    return out, centres, boites


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--nom', required=True); ap.add_argument('--sortie', required=True)
    ap.add_argument('--projection', default='lambert', choices=['lambert', 'monde'])
    ap.add_argument('--centre', default='46.6,2.4', help='lat,lon (projection lambert)')
    ap.add_argument('--large', default=None, help='lonmin,latmin,lonmax,latmax (défaut : monde entier)')
    ap.add_argument('--detail', default=None); ap.add_argument('--admin1', default='')
    ap.add_argument('--villes', default=''); ap.add_argument('--villes-auto', type=int, default=0)
    ap.add_argument('--tol-large', type=float, default=None); ap.add_argument('--tol-detail', type=float, default=0.4)
    A = ap.parse_args()
    lat0, lon0 = (0.0, 0.0) if A.projection == 'monde' else map(float, A.centre.split(','))
    P = projecteur(A.projection, lat0, lon0)
    bx = lambda s: [float(v) for v in s.split(',')] if s else None
    large, detail = bx(A.large), bx(A.detail)
    tl = A.tol_large if A.tol_large is not None else (12.0 if A.projection == 'monde' else 3.0)
    nf = {}
    C = {'nom': A.nom, 'proj': {'type': A.projection, 'lat0': lat0, 'lon0': lon0},
         'source': 'Natural Earth (domaine public)'}
    C['large'], C['centres'], C['boites'] = couche_pays('ne_50m_admin_0_countries.geojson', large, tl, P, 0 if tl >= 5 else 1, nf)
    if detail:
        C['detail'], c2, b2 = couche_pays('ne_10m_admin_0_countries.geojson', detail, A.tol_detail, P, 2 if A.tol_detail < 0.5 else 1, nf)
        C['boites'].update({k: v for k, v in b2.items() if k in C['detail']})
        corners = [P(detail[0], detail[1]), P(detail[2], detail[3]), P(detail[0], detail[3]), P(detail[2], detail[1])]
        C['boiteDetail'] = [round(min(c[0] for c in corners)), round(min(c[1] for c in corners)), round(max(c[0] for c in corners)), round(max(c[1] for c in corners))]
    if A.admin1:
        codes = set(A.admin1.split(','))
        d = json.load(open(os.path.join(NE, 'ne_10m_admin_1_states_provinces_lines.geojson')))
        rs = [simplifie([P(x, y) for x, y in r], A.tol_detail) for f in d['features'] if f['properties'].get('ADM0_A3') in codes
              for r in anneaux(f['geometry']) if dans(r, detail)]
        C['admin1'] = chemin(rs, False, 2 if A.tol_detail < 0.5 else 1)
    C['villes'] = {}
    if A.villes or A.villes_auto:
        d = json.load(open(os.path.join(NE, 'ne_10m_populated_places_simple.geojson')))['features']
        index = {}
        for f in d:
            p = f['properties']
            for k in (p['name'], p['nameascii'], p.get('namealt')):
                if k:
                    index.setdefault(sans_accent(k), p)
        for v in [v.strip() for v in A.villes.split(',') if v.strip()]:
            if '=' in v and ':' in v.split('=')[1]:          # « Nom=lat:lon » : un lieu précis
                nom, ll = v.split('='); la, lo = map(float, ll.split(':'))
                C['villes'][nom] = [round(c, 2) for c in P(lo, la)] + [0]
            elif '=' in v:                                   # « Londres=London » : nom français = nom Natural Earth
                nom, ne = v.split('=')
                if sans_accent(ne) in index:
                    p = index[sans_accent(ne)]; C['villes'][nom] = [round(c, 2) for c in P(p['longitude'], p['latitude'])] + [int(p['pop_max'] or 0)]
                else:
                    print('VILLE INTROUVABLE dans Natural Earth :', ne)
            elif sans_accent(v) in index:
                p = index[sans_accent(v)]; C['villes'][v] = [round(c, 2) for c in P(p['longitude'], p['latitude'])] + [int(p['pop_max'] or 0)]
            else:
                print('VILLE INTROUVABLE dans Natural Earth :', v, '(donne-la en « Nom=lat:lon »)')
        if A.villes_auto and detail:
            cand = sorted([f['properties'] for f in d if detail[0] <= f['properties']['longitude'] <= detail[2] and detail[1] <= f['properties']['latitude'] <= detail[3]],
                          key=lambda p: -(p['pop_max'] or 0))[:A.villes_auto]
            for p in cand:
                C['villes'].setdefault(p['name'], [round(c, 2) for c in P(p['longitude'], p['latitude'])] + [int(p['pop_max'] or 0)])
    ligne = f"(window.CARTES=window.CARTES||{{}})[{json.dumps(A.nom)}]=" + json.dumps(C, ensure_ascii=False, separators=(',', ':')) + ';'
    lignes = []
    if os.path.exists(A.sortie):
        lignes = [l for l in open(A.sortie, encoding='utf-8').read().splitlines() if l.strip() and f'[{json.dumps(A.nom)}]=' not in l]
    else:
        lignes = ['/* Cartes préparées par moteur/outils/prepa_carte.py — données Natural Earth (domaine public). */']
    lignes.append(ligne)
    os.makedirs(os.path.dirname(os.path.abspath(A.sortie)), exist_ok=True)
    open(A.sortie, 'w', encoding='utf-8').write('\n'.join(lignes) + '\n')
    n = len(C['large']) + len(C.get('detail', {}))
    print(f"carte « {A.nom} » : {len(C['large'])} pays (large) + {len(C.get('detail', {}))} (détail), "
          f"{len(C['villes'])} villes, {len(ligne) // 1024} Ko → {A.sortie}")


if __name__ == '__main__':
    main()
