#!/usr/bin/env python3
"""
快速定位 index.html 中三个功能插入点的行号
用法: python find-insert-points.py
"""

import re

FILE = "index.html"

def find_insert_points():
    with open(FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    results = {
        'nav': None,      # 顶部导航栏
        'tools': None,    # 深度工具区
        'jump': None      # 右侧悬浮栏
    }

    # 标记当前在哪个区域
    in_nav = False
    in_tools = False
    in_jump = False

    for i, line in enumerate(lines, 1):
        # 检测区域开始
        if '<nav>' in line or 'class="nav-row"' in line:
            in_nav = True
        if '</nav>' in line:
            in_nav = False
        if 'class="tools-section"' in line or 'id="tools"' in line or '深度工具' in line:
            in_tools = True
        if 'class="jump-bar"' in line:
            in_jump = True

        # 1. 顶部导航栏：找到"占星人类图"链接，记录下一行（插入位置）
        if in_nav and 'astro-hd-courseware.html' in line and '占星人类图' in line:
            results['nav'] = {
                'line': i,
                'content': line.rstrip(),
                'insert_after': i  # 在这一行之后插入
            }

        # 2. 深度工具区：找到占星人类图的 tool-card，记录结束位置
        if in_tools and 'astro-hd-courseware.html' in line and 'tool-card' in line:
            # 找到这个卡片的结束 </a>
            for j in range(i, min(i+50, len(lines))):
                if '</a>' in lines[j] and 'tool-card' not in lines[j]:
                    results['tools'] = {
                        'line': j,
                        'content': lines[j].rstrip(),
                        'insert_after': j
                    }
                    break

        # 3. 右侧悬浮栏：找到占星人类图的 jump-btn
        if in_jump and 'astro-hd-courseware.html' in line and 'jump-btn' in line:
            results['jump'] = {
                'line': i,
                'content': line.rstrip(),
                'insert_after': i
            }

    return results, lines

def main():
    print(f"🔍 扫描 {FILE} 中的三个插入点...\n")
    results, lines = find_insert_points()

    sections = {
        'nav': '📌 顶部导航栏 (在"占星人类图"之后添加)',
        'tools': '🛠️  深度工具区 (在"占星人类图"卡片之后添加)',
        'jump': '🎯 右侧悬浮栏 (在"占星人类图"按钮之后添加)'
    }

    for key, desc in sections.items():
        print(f"{desc}")
        if results[key]:
            r = results[key]
            print(f"   ✅ 找到！插入位置：第 {r['insert_after']} 行之后")
            print(f"   上下文：{r['content'][:80]}...")
            # 显示前后各2行
            start = max(0, r['line'] - 3)
            end = min(len(lines), r['line'] + 3)
            print(f"   邻近行号：{start+1} ~ {end}")
        else:
            print(f"   ❌ 未找到！")
        print()

    # 输出摘要（方便复制）
    print("=" * 60)
    print("📋 快速修改指南（下次直接告诉 AI 这些行号）：")
    print("=" * 60)
    for key, desc in sections.items():
        if results[key]:
            r = results[key]
            print(f"{desc.split('(')[0].strip()}: 在第 {r['insert_after']} 行之后插入")

if __name__ == '__main__':
    main()
