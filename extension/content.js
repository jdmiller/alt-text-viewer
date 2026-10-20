(function() {
    // 1. IMMEDIATE CLEAR: Remove all "zombie" overlays from previous pages/scans
    const clearAll = () => {
        document.querySelectorAll('.atv-overlay').forEach(el => el.remove());
    };
    clearAll();

    const runAudit = () => {
        const imgs = document.querySelectorAll('img');
        imgs.forEach(img => {
            const alt = img.getAttribute('alt');
            const rect = img.getBoundingClientRect();
            const w = img.offsetWidth;
            const h = img.offsetHeight;

            // 2. DECORATIVE FILTRATION (Leniency)
            if (w < 20 || h < 20) return;

            const src = img.src.toLowerCase();
            const cls = img.className.toLowerCase();
            const id = img.id.toLowerCase();
            const isEmptyAlt = (alt !== null && alt.trim() === '');
            const isMissingAttr = (alt === null);

            const decKws = ['icon','bg','divider','spacer','banner','decorative','bullet','logo','placeholder','hidden','ornament','accent','transparent','dot','pixel','line','shadow','gear','blank'];
            const hasDecKeywords = decKws.some(kw => src.includes(kw) || cls.includes(kw) || id.includes(kw));
            
            if (isEmptyAlt && (w <= 200 && h <= 200 || hasDecKeywords)) return;

            // 3. MESSAGING & VISUALS
            const isError = isMissingAttr || isEmptyAlt;
            let labelText = alt;
            if (isMissingAttr) labelText = '❌ Missing alt text';
            else if (isEmptyAlt) labelText = '❌ Missing alt text (suspected)';

            const bgColor = isError 
                ? 'linear-gradient(180deg, rgba(220, 53, 69, 0.9) 0%, rgba(130, 0, 0, 0.8) 100%)' 
                : 'linear-gradient(180deg, rgba(33, 37, 41, 0.9) 0%, rgba(0, 0, 0, 0.8) 100%)';

            // 4. CREATE OVERLAY
            const overlay = document.createElement('div');
            overlay.className = 'atv-overlay';
            Object.assign(overlay.style, {
                position: 'absolute',
                top: (rect.top + window.scrollY) + 'px',
                left: (rect.left + window.scrollX) + 'px',
                width: w + 'px',
                height: h + 'px',
                background: bgColor,
                color: 'white',
                padding: '12px',
                zIndex: '2147483647',
                border: '2px solid rgba(255,255,255,0.6)',
                borderRadius: '4px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                pointerEvents: 'none'
            });

            const txt = document.createElement('div');
            txt.innerText = labelText;
            txt.style.cssText = 'font-size:16px; font-weight:bold; overflow:hidden; display:-webkit-box; -webkit-line-clamp:5; -webkit-box-orient:vertical; text-shadow: 1px 1px 2px black;';

            const footer = document.createElement('div');
            footer.style.cssText = 'display:flex; gap:10px; pointer-events:auto; align-items:center;';

            // High Contrast Buttons (White background / Black text)
            const btnStyle = 'background:#FFF; border:none; color:#000; border-radius:3px; cursor:pointer; font-size:13px; font-weight:bold; padding:4px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.3);';

            const expand = document.createElement('button');
            expand.innerText = 'EXPAND';
            expand.style.cssText = btnStyle;
            expand.onclick = () => {
                const m = document.createElement('div');
                m.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:2147483648; display:flex; align-items:center; justify-content:center; padding:20px;';
                const c = document.createElement('div');
                c.style.cssText = 'background:white; color:black; padding:30px; border-radius:8px; max-width:650px; width:90%; position:relative; font-size:16px;';
                c.innerHTML = `<h3 style="margin-top:0">Image Audit Detail</h3><p><b>Alt Text:</b> ${labelText}</p><hr><p style="font-size:14px"><b>File:</b> ${img.src.split('/').pop()}</p><button id="atv-c" style="margin-top:20px; padding:12px 24px; background:#0078d4; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:bold; font-size:16px;">CLOSE</button>`;
                m.appendChild(c);
                document.body.appendChild(m);
                document.getElementById('atv-c').onclick = () => m.remove();
            };

            const hide = document.createElement('button');
            hide.innerText = 'HIDE';
            hide.onclick = () => overlay.remove();
            hide.style.cssText = btnStyle;

            footer.appendChild(expand);
            footer.appendChild(hide);
            overlay.appendChild(txt);
            overlay.appendChild(footer);
            document.body.appendChild(overlay);
        });
    };

    runAudit();
})();