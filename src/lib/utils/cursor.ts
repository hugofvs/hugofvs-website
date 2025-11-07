import gsap from 'gsap';

export class Cursor {
    private el: HTMLElement;
    private root: HTMLElement;
    private targets: HTMLElement[];
    private lastActive: HTMLElement | null = null;
    private mouse = { x: 0, y: 0 };
    private ticking = false;
    private willRedirect = false;

    constructor(el: HTMLElement) {
        this.el = el;
        this.root = document.documentElement;
        this.targets = [...document.querySelectorAll<HTMLElement>('.target')];

        document.documentElement.style.cursor = 'none';
        this.el.style.pointerEvents = 'none';

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            if (!this.ticking) {
                this.ticking = true;
                requestAnimationFrame(() => this.update());
            }
        });

        // Cancel only the user-generated click we intend to replace
        window.addEventListener(
            'click',
            (e) => {
                if (!this.willRedirect) return;
                if (!e.isTrusted) return; // let our synthetic click through
                e.preventDefault();
                e.stopImmediatePropagation();
            },
            { capture: true }
        );

        // Redirect primary clicks when a target is active
        window.addEventListener(
            'pointerup',
            (e) => {
                if (e.button !== 0 || !this.lastActive || e.defaultPrevented) return;

                const targetEl =
                    this.lastActive.closest('a,button,[role="button"]') || this.lastActive;

                // arm suppression for the native click created by this pointerup
                this.willRedirect = true;

                // schedule activation in a new task so it runs after the native click would have been queued
                setTimeout(() => {
                    try {
                        // Use activation behavior. This triggers handlers and default actions:
                        // - <button> clicks, form submit
                        // - <a href> navigation
                        (targetEl as HTMLElement).click();
                    } finally {
                        // disarm after our synthetic click
                        this.willRedirect = false;
                    }
                }, 0);
            },
            { capture: true }
        );
    }

    private update() {
        this.ticking = false;
        const { x: cursorX, y: cursorY } = this.mouse;

        // choose a single active target
        let active: HTMLElement | null = null;
        let data: any = null;
        let minD = Infinity;

        for (const t of this.targets) {
            const r = t.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = cx - cursorX;
            const dy = cy - cursorY;
            const d = Math.hypot(dx, dy);
            const trigger = r.width;
            if (d < trigger && d < minD) {
                minD = d;
                active = t;
                data = { r, cx, cy, dx, dy, d };
            }
        }

        if (this.lastActive && this.lastActive !== active) {
            const prevText = this.lastActive.querySelector<HTMLElement>('.text');
            if (prevText) gsap.to(prevText, { duration: 0.18, x: 0, y: 0, overwrite: 'auto' });
            this.lastActive.classList.remove('is-hovered');
        }

        if (active && data) {
            const { r, cx, cy, dx, dy, d } = data;
            const a = Math.atan2(dy, dx);
            gsap.to(this.el, {
                duration: 0.18,
                overwrite: true,
                left: cx - (Math.cos(a) * d) / 2,
                top: cy - (Math.sin(a) * d) / 2,
                width: r.width * 1.5,
                height: r.height
            });
            const txt = active.querySelector<HTMLElement>('.text');
            if (txt)
                gsap.to(txt, {
                    duration: 0.18,
                    overwrite: 'auto',
                    x: -((Math.cos(a) * d) / 2),
                    y: -((Math.sin(a) * d) / 2)
                });
            active.classList.add('is-hovered');
        } else {
            gsap.to(this.el, {
                duration: 0.08,
                overwrite: true,
                left: cursorX,
                top: cursorY,
                width: 12,
                height: 12
            });
            if (this.lastActive) {
                const txt = this.lastActive.querySelector<HTMLElement>('.text');
                if (txt) gsap.to(txt, { duration: 0.18, overwrite: 'auto', x: 0, y: 0 });
            }
        }

        if (active) this.root.classList.add('cursor-hot');
        else this.root.classList.remove('cursor-hot');

        this.lastActive = active;
    }

    public refreshTargets() {
        this.targets = [...document.querySelectorAll<HTMLElement>('.target')];
    }
}
