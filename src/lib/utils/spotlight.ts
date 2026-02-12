/**
 * Svelte action that tracks cursor position within an element
 * and exposes --sx / --sy CSS custom properties for a spotlight effect.
 */
export function spotlight(node: HTMLElement) {
    function setPosition(e: MouseEvent) {
        const r = node.getBoundingClientRect();
        node.style.setProperty('--sx', `${e.clientX - r.left}px`);
        node.style.setProperty('--sy', `${e.clientY - r.top}px`);
    }

    node.addEventListener('mouseenter', setPosition);
    node.addEventListener('mousemove', setPosition);

    return {
        destroy() {
            node.removeEventListener('mouseenter', setPosition);
            node.removeEventListener('mousemove', setPosition);
        }
    };
}
