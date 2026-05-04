import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, Input } from '@angular/core';

@Directive({
    selector: '[appReveal]',
    standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
    @Input() revealDelay: string = '';
    
    private observer: IntersectionObserver | null = null;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        // Initial state
        this.renderer.addClass(this.el.nativeElement, 'reveal');
        
        if (this.revealDelay) {
            this.renderer.addClass(this.el.nativeElement, `delay-${this.revealDelay}`);
        }

        const options = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.renderer.addClass(this.el.nativeElement, 'active');
                    // Once animated, we can stop observing if we want it to stay
                    this.observer?.unobserve(this.el.nativeElement);
                }
            });
        }, options);

        this.observer.observe(this.el.nativeElement);
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
