import { ElementMirror } from './element-mirror';

/**
 * abstract mirror that covers things which are the same across browsers
 */
export abstract class AbstractHTMLTextEntryMirror extends ElementMirror
{
    constructor(
        document: Document,
        input_element: HTMLTextAreaElement | HTMLTextAreaElement,
        rect_polling_interval?: number
    ) {
        super(
            document,
            input_element,
            rect_polling_interval
        );
    }

    protected abstract get_mirror_div():  HTMLDivElement;

    protected mirror_content(value: string)
    {
        this.get_mirror_div().textContent =   value + '\0';
    }
    protected mirror_scroll(scrollLeft: number, scrollTop: number)
    {
        this.get_mirror_div().scrollLeft =    scrollLeft;
        this.get_mirror_div().scrollTop =     scrollTop;
    }
    protected mirror_rect(left: number, top: number, width: number, height: number)
    {
        this.div.style.top =            `${ top }px`;
        this.div.style.left =           `${ left }px`;
    }
    protected mirror_style(computed_style: CSSStyleDeclaration)
    {
        Array.from(computed_style).forEach(
            key => this.get_mirror_div().style.setProperty(
                        key,
                        computed_style.getPropertyValue(key),
                        computed_style.getPropertyPriority(key)
            )
        );

        this.get_mirror_div().style.cssText +=              'appearance: textarea;';
        
        // TODO: this should probably be handled on a case by case, not just auto
        this.get_mirror_div().style.overflow =              'auto';

        // remove margins
        this.get_mirror_div().style.margin =                '0px';
        this.get_mirror_div().style.marginTop =             '0px';
        this.get_mirror_div().style.marginBottom =          '0px';
        this.get_mirror_div().style.marginLeft =            '0px';
        this.get_mirror_div().style.marginRight =           '0px';
        this.get_mirror_div().style.marginBlockStart =      '0px';
        this.get_mirror_div().style.marginBlockEnd =        '0px';
        this.get_mirror_div().style.marginInlineStart =     '0px';
        this.get_mirror_div().style.marginInlineEnd =       '0px';

        this.div.style.boxSizing =                          'border-box';

        this.get_mirror_div().style.pointerEvents =         'none';
        this.get_mirror_div().style.display =               'block';
        // debugging:
        // this.get_mirror_div().style.zIndex =                '-99999';
        // this.get_mirror_div().style.opacity =               '0.5';
        this.get_mirror_div().style.visibility =            'hidden';

        // this could be abstracted out
        this.root_div.style.pointerEvents =                 'none';
        this.div.style.pointerEvents =                      'none';
        this.div.style.display =                            'block';
        this.div.style.position =                           'absolute';
    }
};