/**
 * Panel which holds controls
 * @class
 * @extends external:H.ui.Control
 */
class Panel extends H.ui.Control {
    /**
     * @param {string} header - panel title
     */
    constructor(header) {
        super();
        this.header_ = header;
        this.setAlignment('top-left');
    }
    renderInternal(el, doc) {
        this.addClass('dl-panel');
        el.innerHTML = `
            <div class="dl-panel__header">${this.header_}</div>
        `;
        super.renderInternal(el, doc);
    }
    addChild(control) {
        //subscribe on events of child controls
        control.setParentEventTarget(this);
        return super.addChild(control);
    }
}

/**
 * Label for Control
 * @class
 * @extends external:H.ui.Control
 */
class Label extends H.ui.Control {
    renderInternal() {
        this.addClass('dl-label');
    }
    /**
     * @param {string} html - label html
     */
    setHTML(html) {
        this.getElement().innerHTML = html;
        return this;
    }
}

let i = 0;

/**
 * returns uniq id
 * @return {string}
 */
var uniqId = function() {
    return 'dl-id' + i++;
};

/**
 * Menu of options with one possible selected item in same time
 * @class
 * @extends external:H.ui.Control
 */
class Select extends H.ui.Control {
    /**
     * @param {Object} values - object where property name is value and property value is label
     */
    constructor(values) {
        super();
        this.values = values;
    }
    renderInternal(el) {
        let name = uniqId();
        this.addClass('dl-select');
        el.innerHTML = `<div class="dl-select__title">Select one</div><div class="dl-select__options">${Object.keys(
            this.values
        ).map((value) => {
            const title = this.values[value];
            const id = 'dl-select-' + value;
            return `<div class="dl-select__option">
                <input
                    class="dl-select__input"
                    type="radio"
                    name="${name}"
                    id="${id}"
                    value="${value}"
                />
                <label
                    class="dl-select__label"
                    for="${id}"
                >${title}</label>
            </div>`
        }).join('')}</div>`;
        el.addEventListener(
            'change', () => {
                this.dispatchEvent('change');
            }
        );
    }
    /**
     * @returns {string} value
     */
    getValue() {
        const inputs = this.getElement().querySelectorAll(
            'input[type=radio]:checked'
        );
        return inputs[0] && inputs[0].value;
    }
}
