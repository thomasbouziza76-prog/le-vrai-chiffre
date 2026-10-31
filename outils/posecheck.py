import sys
from playwright.sync_api import sync_playwright
from PIL import Image
names=[f"K{i:02d}" for i in range(1,23)] if len(sys.argv)<2 else sys.argv[1].split(",")
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":1080,"height":1920})
    errs=[]; pg.on("pageerror",lambda e: errs.append(str(e)))
    pg.goto("file:///home/claude/motion-design-claude-code/glacon-poche/reference/monde.html"); pg.wait_for_timeout(600)
    ims=[]
    for n in names:
        pg.evaluate(f"pose('{n}')"); pg.wait_for_timeout(150)
        pg.screenshot(path=f"/home/claude/sbwork/{n}.png"); ims.append(Image.open(f"/home/claude/sbwork/{n}.png").resize((270,480)))
    b.close()
cols=min(8,len(ims)); rows=(len(ims)+cols-1)//cols
sheet=Image.new("RGB",(cols*275,rows*485),"white")
for i,im in enumerate(ims): sheet.paste(im,((i%cols)*275,(i//cols)*485))
sheet.save("/home/claude/sbwork/sheet.png"); print(errs)
