// 問題チェック用の StorageManager
interface StatusData {
    [key: string]: boolean;
}

const StorageManager = {
    key: 'task-status-db',
    data: null as StatusData | null,

    init(): StatusData {
        if (this.data === null) {
            try {
                const item = localStorage.getItem(this.key);
                this.data = item ? JSON.parse(item) : {};
            } catch (e) {
                this.data = {};
            }
        }
        return this.data!;
    },

    get(url: string): boolean {
        if(url === '') return false;
        return !!this.init()[url];
    },

    toggle(url: string): void {
        if(url==='') return;
        const data = this.init();
        if (!data[url]) {
            data[url] = true;
        } else {
            delete data[url];
        }
        localStorage.setItem(this.key, JSON.stringify(data));
    }
};

class TaskCheck extends HTMLElement {
    private url: string = '';
    private ns: string = 'http://www.w3.org/2000/svg';
    useElm: SVGUseElement = document.createElementNS(this.ns, 'use') as SVGUseElement;

    constructor() {
        super();
    }

    connectedCallback(): void {
        const svg = document.createElementNS(this.ns, 'svg');
        svg.setAttribute('viewBox', '0 0 16 16');
        svg.style = 'width: 28px; height: auto; cursor:pointer;';
        svg.appendChild(this.useElm);
        this.appendChild(svg);

        this.url = this.getAttribute('url') || '';
        this.render();
        this.addEventListener('click', (e: Event) => {
            StorageManager.toggle(this.url);
            this.render();
        }, false);
    }
    
    get isChecked(): boolean {
        return StorageManager.get(this.url);
    }

    private render(): void {
        const iconId = this.isChecked ? '#square-fill' : '#square';
        this.useElm.setAttribute('href', '/imgs/icons.svg' + iconId);
    }
}

customElements.define('task-check', TaskCheck);

