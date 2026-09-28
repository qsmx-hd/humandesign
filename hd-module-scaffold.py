# -*- coding: utf-8 -*-
"""
《人类图网站》新模块脚手架生成器  ·  hd-module-scaffold.py
=====================================================================
用途：当你要新增一个课程/工具模块（如「人类图·XX之道」）时，
      一键生成 course+cheatsheet+courseware+workbook 四件套，
      并自动：① 备份 index.html → index.v[N+1].html
              ② 在顶部导航 mega-menu 的对应子栏目组插入入口
              ③ 在首页工具区插入对应 tool-card
              （注：右侧悬浮栏已于 2026-09-22 移除，无需同步）

设计系统：暖棕金  #F5F0E8(米白) / #C4956A(金棕) / #2D2118(深棕)
          辅色 #8B6644 / #E8DCC8(描边) / #5B7B6F(觉醒绿) / #9C5B4D(非我红)

用法：
  python hd-module-scaffold.py --name 开心之道 --slug hd-kaixin-zhidao \
        --subcat 问道系列 --emoji 😊 --desc "一句话简介" \
        --topics "日常练习,21天落地" --lecturer 邓勤敏

  --dry-run   只打印将要生成的文件与导航片段，不写任何文件（推荐先跑一次）
  --demo      把生成结果写到临时目录验证，不碰项目文件

约定（与项目一致）：
  - 文件名：{slug}-course.html / -cheatsheet.html / -courseware.html / -workbook.html
  - 四件套互相用 .resnav 互链，"当前页"打 tag
  - 页脚固定 "Powered By Kan Man Tang"
  - VERSION 常量写在每个文件 <head> 注释里
"""
import os, re, sys, shutil, argparse, datetime

# ---------- 共享设计系统（暖棕金） ----------
CSS_COMMON = """
:root{--bg:#F5F0E8;--card:#FFFBF5;--dark:#2D2118;--gold:#C4956A;--gold-d:#A87B52;--brown:#8B6644;--border:#E8DCC8;--awake:#5B7B6F;--notself:#9C5B4D;--text:#3D3530;--text-l:#6B5D52;}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--text);font-family:"PingFang SC","Microsoft YaHei",sans-serif;line-height:1.7;font-size:15px;-webkit-font-smoothing:antialiased}
.wrap{max-width:960px;margin:0 auto;padding:22px 16px 60px}
header{text-align:center;padding:20px 10px 10px}
header .kick{color:var(--gold-d);letter-spacing:4px;font-size:11px;text-transform:uppercase}
header h1{font-family:"Noto Serif SC",serif;font-size:26px;color:var(--dark);margin:6px 0 4px}
header p{color:var(--text-l);font-size:13.5px}
.sec-t{font-family:"Noto Serif SC",serif;color:var(--dark);font-size:18px;border-left:5px solid var(--gold);padding-left:10px;margin:30px 0 14px}
.card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:18px;box-shadow:0 2px 8px rgba(45,33,24,.07)}
.card h3{font-size:17px;color:var(--brown);margin-bottom:6px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}
.box{background:#FAF6EE;border:1px solid var(--border);border-radius:8px;padding:14px 16px;margin:12px 0}
.box .t{font-weight:700;color:var(--brown);margin-bottom:6px}
footer{text-align:center;color:var(--text-l);font-size:12px;margin-top:34px;border-top:1px solid var(--border);padding-top:14px}
.resnav{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin:20px 0}
.resnav a{display:block;background:#FFFBF5;border:1px solid #E8DCC8;border-radius:12px;padding:16px 18px;box-shadow:0 2px 8px rgba(45,33,24,.08);transition:.2s;color:#A87B52;font-weight:600;font-size:15px;text-decoration:none}
.resnav a:hover{transform:translateY(-3px);box-shadow:0 6px 22px rgba(45,33,24,.14);border-color:#C4956A}
.resnav a small{display:block;font-size:12.5px;color:#6B5D52;font-weight:400;margin-top:5px;line-height:1.5}
.resnav a .tag{display:inline-block;font-size:11px;color:#fff;background:#5B7B6F;border-radius:6px;padding:1px 8px;margin-left:6px;vertical-align:middle;font-weight:400}
.resnav a.home{border-left:5px solid #C4956A}
@media(max-width:560px){.grid,.resnav{grid-template-columns:1fr}}
"""

def resnav(slug, current):
    items = [
        ("course", "🏠 课程主页", "返回课程全貌与报名入口"),
        ("courseware", "📖 完整课件", "教学正文 · 可打印"),
        ("cheatsheet", "🃏 速查卡", "要点速记 · 随身看"),
        ("workbook", "📝 练习手册", "21 天打卡 · 可打印"),
    ]
    out = ['<div class="resnav" style="margin:30px 0 0">']
    for key, label, sub in items:
        f = f"{slug}-{key}.html"
        tag = '<span class="tag">当前页</span>' if key == current else ''
        out.append(f'  <a class="home" href="{f}">{label}<small>{sub}</small></a>' if key == current else f'  <a href="{f}">{label}<small>{sub}</small></a>')
        if key == current:
            out[-1] = out[-1].replace('</a>', f'{tag}</a>')
    out.append('</div>')
    return "\n".join(out)

def tpl_course(p):
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>人类图 · {p['name']} ｜ 课程主页</title>
<!--
  《人类图 · {p['name']}》｜课程主页
  VERSION: {p['version']}  ·  {p['date']}
  讲师：{p['lecturer']}
-->
<style>{CSS_COMMON}</style>
</head>
<body>
<div class="wrap">
<header>
  <div class="kick">HUMAN DESIGN · {p['subcat'].upper() if False else p['subcat']} · COURSE</div>
  <h1>人类图 · {p['name']}</h1>
  <p>{p['desc']}</p>
</header>

<div class="sec-t">① 课程简介</div>
<div class="card"><p>在这里写模块的定位与价值。围绕「活出设计 → 非我消融 → 签名流动」主轴展开。</p></div>

<div class="sec-t">② 适合谁</div>
<div class="grid">
  <div class="card"><h3>人群一</h3><p>说明这类人为什么需要这个模块。</p></div>
  <div class="card"><h3>人群二</h3><p>说明典型痛点与对应收益。</p></div>
</div>

<div class="sec-t">③ 课程大纲（占位）</div>
<div class="box"><div class="t">模块清单</div>
  <p>模块 1：<span class="fill">&nbsp;</span></p>
  <p>模块 2：<span class="fill">&nbsp;</span></p>
  <p>模块 3：<span class="fill">&nbsp;</span></p>
</div>

<div class="sec-t">④ 报名 / 下一步</div>
<div class="card"><p>放置报名入口、定价或引导话术（可引用 booking.html）。</p></div>

{resnav(p['slug'],'course')}
<footer>人类图 · {p['name']} ｜ 课程主页<br>Powered By {p['lecturer']}</footer>
</div>
</body>
</html>
"""

def tpl_cheatsheet(p):
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>人类图 · {p['name']} ｜ 速查卡</title>
<!--
  《人类图 · {p['name']}》｜速查卡
  VERSION: {p['version']}  ·  {p['date']}
-->
<style>{CSS_COMMON}</style>
</head>
<body>
<div class="wrap">
<header>
  <div class="kick">HUMAN DESIGN · QUICK CARD</div>
  <h1>人类图 · {p['name']} ｜ 速查卡</h1>
  <p>贴在桌面、存进手机。需要时翻一眼，回到策略与权威。</p>
</header>

<div class="sec-t">① 要点速记（占位）</div>
<div class="grid">
  <div class="card"><h3>要点一</h3><p>一句话锚点。</p></div>
  <div class="card"><h3>要点二</h3><p>一句话锚点。</p></div>
</div>

<div class="sec-t">② 每日口诀</div>
<div class="card" style="background:linear-gradient(135deg,var(--brown),var(--gold));color:#fff;border:none">
  <h3 style="color:#fff">天天练！</h3>
  <p style="color:#fff">把事与情分开，回到策略与权威。</p>
</div>

{resnav(p['slug'],'cheatsheet')}
<footer>人类图 · {p['name']} ｜ 速查卡<br>Powered By {p['lecturer']}</footer>
</div>
</body>
</html>
"""

def tpl_courseware(p):
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>人类图 · {p['name']} ｜ 完整课件</title>
<!--
  《人类图 · {p['name']}》｜完整课件
  VERSION: {p['version']}  ·  {p['date']}
-->
<style>{CSS_COMMON}</style>
</head>
<body>
<div class="wrap">
<header>
  <div class="kick">HUMAN DESIGN · COURSEWARE</div>
  <h1>人类图 · {p['name']} ｜ 完整课件</h1>
  <p>教学正文，按模块组织，可打印。</p>
</header>

<div class="sec-t">模块一（占位）</div>
<div class="box"><div class="t">教学正文</div><p>在此写入模块一的正文、案例与练习。</p></div>

<div class="sec-t">模块二（占位）</div>
<div class="box"><div class="t">教学正文</div><p>在此写入模块二的正文、案例与练习。</p></div>

{resnav(p['slug'],'courseware')}
<footer>人类图 · {p['name']} ｜ 完整课件<br>Powered By {p['lecturer']}</footer>
</div>
</body>
</html>
"""

def tpl_workbook(p):
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>人类图 · {p['name']} ｜ 学员练习手册</title>
<!--
  《人类图 · {p['name']}》｜学员练习手册
  VERSION: {p['version']}  ·  {p['date']}
-->
<style>{CSS_COMMON}
.fill{{border-bottom:1px solid var(--border);display:inline-block;min-width:140px;padding:0 4px}}
.daycard{{border:1px solid var(--border);border-radius:10px;padding:14px;background:#FFFBF5;margin:10px 0}}
.daycard .dn{{font-family:"Noto Serif SC",serif;color:var(--gold);font-weight:700;font-size:15px}}
</style>
</head>
<body>
<div class="wrap">
<header>
  <h1>人类图 · {p['name']}</h1>
  <div class="sub" style="color:var(--text-l);font-size:14px;margin-top:6px">学员练习手册 · 配套实修打卡</div>
</header>

<h2 style="color:var(--brown);font-size:20px;border-left:6px solid var(--gold);padding:8px 12px;margin:30px 0 12px;background:#FAF6EE;border-radius:6px;font-family:'Noto Serif SC',serif">一、我的设计靶心</h2>
<div class="box">
  <div class="t">填一填（对着你的图抄写）</div>
  <p>类型 Type：<span class="fill">&nbsp;</span></p>
  <p>策略 Strategy：<span class="fill">&nbsp;</span></p>
  <p>内在权威 Authority：<span class="fill">&nbsp;</span></p>
  <p>非我主题 Not-Self：<span class="fill">&nbsp;</span></p>
  <p>签名 Signature：<span class="fill">&nbsp;</span></p>
</div>

<h2 style="color:var(--brown);font-size:20px;border-left:6px solid var(--gold);padding:8px 12px;margin:30px 0 12px;background:#FAF6EE;border-radius:6px;font-family:'Noto Serif SC',serif">二、21 天打卡（占位模板，可复制）</h2>
<div class="daycard"><div class="dn">第 1 天</div><p>今天一件真实的满足/平静/成功/喜悦：<span class="fill">&nbsp;</span></p></div>

{resnav(p['slug'],'workbook')}
<footer>人类图 · {p['name']} ｜ 练习手册<br>Powered By {p['lecturer']}</footer>
</div>
</body>
</html>
"""

TEMPLATES = {"course": tpl_course, "cheatsheet": tpl_cheatsheet, "courseware": tpl_courseware, "workbook": tpl_workbook}

# ---------- index.html 自动同步 ----------
def backup_index(root):
    idx = os.path.join(root, "index.html")
    if not os.path.exists(idx):
        return None
    vs = [int(re.search(r"index\.v(\d+)\.html", f).group(1))
          for f in os.listdir(root) if re.match(r"index\.v\d+\.html$", f)]
    n = (max(vs) if vs else 18) + 1
    dst = os.path.join(root, f"index.v{n}.html")
    shutil.copy2(idx, dst)
    return dst

def insert_topnav(html, subcat, slug, emoji, name):
    """在标题含 subcat 的 mega-group 内、闭合 </div> 前插入新 <a>。返回 (新html, 是否成功)。"""
    title_marker = f'mega-group-title">'
    # 找到含 subcat 的 mega-group-title
    m = re.search(re.escape(title_marker) + r'[^<]*' + re.escape(subcat) + r'[^<]*</div>', html)
    if not m:
        return html, False
    group_start = html.rfind('<div class="mega-group">', 0, m.start())
    if group_start < 0:
        return html, False
    # 从 group 开始做 div 深度追踪，找到闭合 </div>
    i = html.index('>', group_start) + 1
    depth = 1
    close_pos = -1
    for mm in re.finditer(r'<div\b|</div>', html[i:]):
        if mm.group(0) == '<div':
            depth += 1
        else:
            depth -= 1
            if depth == 0:
                close_pos = i + mm.start()
                break
    if close_pos < 0:
        return html, False
    indent = "          "
    new_a = f'{indent}<a href="{slug}-course.html" target="_blank">{emoji} 人类图·{name}</a>\n'
    return html[:close_pos] + new_a + html[close_pos:], True

def insert_toolcard(html, subcat, slug, emoji, name, desc, topics):
    """在内容含 subcat 的最后一个 tool-card 之后插入新 tool-card。返回 (新html, 是否成功)。"""
    # 找所有 tool-card-level">subcat 或 meta 含 subcat 的卡片，取最后一个的闭合 </a>
    positions = [mm.start() for mm in re.finditer(re.escape(subcat), html)
                 if 'tool-card' in html[max(0, mm.start()-400):mm.start()+200]]
    if not positions:
        return html, False
    last = max(positions)
    end_a = html.index('</a>', last)
    tlist = "".join(f'<span class="tool-card-topic">{t.strip()}</span>\n          ' for t in topics)
    block = f'''    <a href="{slug}-course.html" target="_blank" class="tool-card" style="border-color:#B8860B;">
      <div class="tool-card-banner" style="background:linear-gradient(135deg,#5C4033,#B8860B,#F2DF74);">
        <span class="tool-card-emoji">{emoji}</span>
        <span class="tool-card-level">{subcat}</span>
      </div>
      <div class="tool-card-body">
        <div class="tool-card-title">人类图·{name}</div>
        <div class="tool-card-desc">{desc}</div>
        <div class="tool-card-topics">
          {tlist}</div>
        <div class="tool-card-footer">
          <span class="tool-card-meta">{subcat} · {name}课程</span>
          <span class="tool-card-link">打开课件 →</span>
        </div>
      </div>
    </a>
'''
    return html[:end_a+4] + "\n" + block + html[end_a+4:], True

# ---------- 主流程 ----------
def main():
    ap = argparse.ArgumentParser(description="人类图网站新模块脚手架")
    ap.add_argument("--name", required=True, help="模块名，如 开心之道")
    ap.add_argument("--slug", required=True, help="文件名前缀，如 hd-kaixin-zhidao")
    ap.add_argument("--subcat", default="问道系列", help="子栏目，如 问道系列 / 艺术系列")
    ap.add_argument("--emoji", default="✨", help="导航 emoji")
    ap.add_argument("--desc", default="", help="一句话简介")
    ap.add_argument("--topics", default="", help="工具区标签，逗号分隔")
    ap.add_argument("--lecturer", default="邓勤敏", help="署名")
    ap.add_argument("--root", default=os.path.dirname(os.path.abspath(__file__)), help="项目根目录")
    ap.add_argument("--dry-run", action="store_true", help="只打印，不写文件")
    ap.add_argument("--demo", action="store_true", help="写到临时目录验证")
    a = ap.parse_args()

    p = {
        "name": a.name, "slug": a.slug, "subcat": a.subcat, "emoji": a.emoji,
        "desc": a.desc or f"人类图·{a.name}：活出设计，回到策略与权威。",
        "lecturer": a.lecturer,
        "version": "V1", "date": datetime.date.today().strftime("%Y-%m-%d"),
        "topics": [t for t in a.topics.split(",") if t.strip()] or [a.subcat, "日常练习"],
    }

    files = {k: os.path.join(a.root, f"{a.slug}-{k}.html") for k in TEMPLATES}

    if a.demo:
        import tempfile
        a.root = tempfile.mkdtemp(prefix="hd-scaffold-")
        files = {k: os.path.join(a.root, f"{a.slug}-{k}.html") for k in TEMPLATES}
        # demo 模式复制一份 index.html 以验证插入
        shutil.copy2(os.path.join(os.path.dirname(os.path.abspath(__file__)), "index.html"),
                     os.path.join(a.root, "index.html"))

    print(f"=== 将生成 4 个文件（{p['slug']}-*.html）===")
    for k in TEMPLATES:
        content = TEMPLATES[k](p)
        if a.dry_run or a.demo:
            print(f"  ✓ {files[k]}  ({len(content)} 字节，dry/demo 未写入项目)")
        else:
            with open(files[k], "w", encoding="utf-8") as f:
                f.write(content)
            print(f"  ✓ 已写 {files[k]}")

    # index.html 同步
    idx = os.path.join(a.root, "index.html")
    if os.path.exists(idx):
        html = open(idx, encoding="utf-8").read()
        bak = None
        if not (a.dry_run or a.demo):
            bak = backup_index(a.root)
            print(f"  ✓ 已备份 index.html → {os.path.basename(bak)}")
        h2, ok1 = insert_topnav(html, p["subcat"], p["slug"], p["emoji"], p["name"])
        h3, ok2 = insert_toolcard(h2, p["subcat"], p["slug"], p["emoji"], p["name"], p["desc"], p["topics"])
        if a.dry_run:
            print(f"  · 顶部导航插入: {'成功' if ok1 else '未找到匹配组→需手动粘贴'}")
            print(f"  · 工具区插入:   {'成功' if ok2 else '未找到匹配卡片→需手动粘贴'}")
        else:
            # demo 写回临时副本；正式运行写回项目 index.html
            open(idx, "w", encoding="utf-8").write(h3)
            if not a.demo:
                print(f"  ✓ index.html 已同步两处导航")
        if not ok1:
            print(f"    [片段] 顶部导航 <a>：<a href=\"{p['slug']}-course.html\" target=\"_blank\">{p['emoji']} 人类图·{p['name']}</a>")
        if not ok2:
            print(f"    [片段] 工具区 card：见生成器输出，请粘到 {p['subcat']} 分组末尾")
    else:
        print("  ! 未找到 index.html，跳过导航同步")

    if a.demo:
        print(f"\n[demo] 验证文件在临时目录：{a.root}")
        # 验证插入是否真的发生
        v = open(os.path.join(a.root, "index.html"), encoding="utf-8").read()
        print(f"[demo] 顶部导航含新入口: {'人类图·'+p['name'] in v}")
        print(f"[demo] 工具区含新卡片: {'人类图·'+p['name'] in v}")

if __name__ == "__main__":
    main()
