"""iPhone device frame renderer for the preview cards.

The Supahealth captures already include a device frame; the Flyerz screens are
bare 390x844 exports from Figma, so they get framed here. Used by the compositing
scripts that build assets/previews/*.webp.
"""
from PIL import Image, ImageDraw

def iphone(screen_img, screen_h, body=(28,28,30), rail=(72,74,78)):
    """Wrap a bare app screenshot in an iPhone-style frame.
    screen_h is the height of the *screen*; the returned image is larger."""
    im = screen_img.convert("RGB")
    sw = round(im.width * screen_h / im.height)
    im = im.resize((sw, screen_h), Image.LANCZOS)

    bez  = max(2, round(sw * 0.035))          # bezel thickness
    edge = max(1, round(sw * 0.008))          # bright outer rail
    bw, bh = sw + 2*bez, screen_h + 2*bez
    r_out = round(bw * 0.155)
    r_scr = max(2, r_out - bez)

    dev = Image.new("RGBA", (bw, bh), (0,0,0,0))
    d = ImageDraw.Draw(dev)
    d.rounded_rectangle([0,0,bw-1,bh-1], radius=r_out, fill=rail)          # rail
    d.rounded_rectangle([edge,edge,bw-1-edge,bh-1-edge],
                        radius=r_out-edge, fill=body)                       # body

    # screen, corner-masked
    m = Image.new("L",(sw,screen_h),0)
    ImageDraw.Draw(m).rounded_rectangle([0,0,sw-1,screen_h-1], radius=r_scr, fill=255)
    scr = im.convert("RGBA"); scr.putalpha(m)
    dev.alpha_composite(scr, (bez,bez))

    # dynamic island
    iw, ih = round(sw*0.30), round(sw*0.085)
    ix, iy = bez + (sw-iw)//2, bez + round(sw*0.028)
    ImageDraw.Draw(dev).rounded_rectangle([ix,iy,ix+iw,iy+ih], radius=ih//2, fill=(8,8,10))

    # side buttons
    bd = ImageDraw.Draw(dev)
    btn_w = max(1, round(bez*0.42))
    for y0,y1 in ((0.175,0.235),(0.265,0.355),(0.375,0.465)):             # left
        bd.rounded_rectangle([-btn_w, round(bh*y0), btn_w, round(bh*y1)],
                             radius=btn_w, fill=rail)
    bd.rounded_rectangle([bw-1-btn_w, round(bh*0.245), bw-1+btn_w, round(bh*0.375)],
                         radius=btn_w, fill=rail)
    return dev
