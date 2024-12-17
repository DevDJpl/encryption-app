import { Menu } from "primereact/menu";
import { Tag } from "primereact/tag";
import "./Sidebar.css";

const Sidebar = () => {
    const item = (item: any) => (
        <a href={item.url} className="relative flex items-center py-3 px-5 text-surface-700 dark:text-white/80 no-underline overflow-hidden cursor-pointer select-none">
            <span className={`mr-2 text-surface-600 dark:text-[#2196f3] ${item.icon}`} />
            <span className="leading-none">{item.label}</span>
            {item.tag && (
                <Tag value={item.tag} className="ml-auto" />
            )}
        </a>
    );

    const items = [
        {
            label: 'Menu',
            items: [
                {
                    label: 'Home',
                    icon: 'pi pi-home',
                    url: '/',
                    template: item
                },
                {
                    label: 'Certyficate',
                    icon: 'pi pi-shield',
                    url: '/certificate',
                    tag: 'NEW',
                    template: item
                },
            ]
        },
        {
            label: 'Algorithm',
            items: [
                {
                    label: 'Caesar',
                    icon: 'pi pi-th-large',
                    url: '/encryption?algorithm=caesar',
                    template: item
                },
                {
                    label: 'Transposition',
                    icon: 'pi pi-th-large',
                    url: '/encryption?algorithm=transposition',
                    template: item
                },
                {
                    label: 'base64',
                    icon: 'pi pi-th-large',
                    url: '/encryption?algorithm=base64',
                    template: item
                },
                {
                    label: 'Beauforta',
                    icon: 'pi pi-th-large',
                    url: '/encryption?algorithm=beauforta',
                    template: item
                },
                {
                    label: 'Vigenère',
                    icon: 'pi pi-th-large',
                    url: '/encryption?algorithm=vigenere',
                    template: item
                },
                {
                    label: 'Polibius',
                    icon: 'pi pi-th-large',
                    url: '/encryption?algorithm=polibius',
                    template: item
                },
                {
                    label: 'AES',
                    icon: 'pi pi-th-large',
                    url: '/encryption?algorithm=aes',
                    template: item
                },
                {
                    label: 'DES',
                    icon: 'pi pi-th-large',
                    url: '/encryption?algorithm=des',
                    template: item
                },
                {
                    label: 'RSA',
                    icon: 'pi pi-th-large',
                    url: '/encryption?algorithm=rsa',
                    template: item
                }, 
                {
                    label: 'Diffie-Hellman',
                    icon: 'pi pi-th-large',
                    url: '/encryption?algorithm=diffie-hellman',
                    template: item
                },
                {
                    label: 'HMAC',
                    icon: 'pi pi-th-large',
                    url: '/encryption?algorithm=hmac',
                    template: item
                },    
                {
                    label: 'Huffman',
                    icon: 'pi pi-th-large',
                    url: '/encryption?algorithm=huffman',
                    template: item
                },
                {
                    label: 'Hamming',
                    icon: 'pi pi-th-large',
                    url: '/encryption?algorithm=hamming',
                    template: item
                },
            ]
        }
    ];

    return (
        <div className="sidebar w-[280px]" id="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-header-content">
                    <div className="app-logo">
                        <svg className="app-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="38" height="38" x="0" y="0" viewBox="0 0 60 60" xmlSpace="preserve"><g><path fill="#193870" d="M54.242 33.792a19.863 19.863 0 0 1-23.672 5.013l-2.408 2.407a1.046 1.046 0 0 1-1.48 0 .91.91 0 0 0-.663-.276.936.936 0 0 0-.938.939v1.965a1.079 1.079 0 0 1-.332.773l-.906.916a1.123 1.123 0 0 1-.784.332h-3.292a.938.938 0 0 0-.939.938v3.279a1.136 1.136 0 0 1-.32.784l-.917.917a1.092 1.092 0 0 1-.784.32h-3.292a.938.938 0 0 0-.939.939v3.29a1.092 1.092 0 0 1-.32.784l-1.237 1.237A2.289 2.289 0 0 1 9.461 59l-6.23-.022a2.23 2.23 0 0 1-2.209-2.208L1 50.542a2.2 2.2 0 0 1 .652-1.568l19.54-19.532a19.885 19.885 0 1 1 33.05 4.35z" opacity="1"></path><path fill="#3fb2e0" d="m45.37 2.01-5.94 5.93-1.41-1.41 5.11-5.12a17.2 17.2 0 0 1 2.24.6zM52.31 5.99l-9.93 9.94a4.38 4.38 0 0 1-3.06 1.26H30v-2h9.32a2.341 2.341 0 0 0 1.64-.68l9.78-9.77a16.863 16.863 0 0 1 1.57 1.25zM58.6 16.88l-5.17 5.17-1.41-1.41 5.99-5.99a17.017 17.017 0 0 1 .59 2.23zM55.29 9.27l-9.79 9.78a2.318 2.318 0 0 0-.68 1.63V30h-2v-9.32a4.375 4.375 0 0 1 1.26-3.05l9.94-9.93c.25.27.48.54.71.83.19.24.38.49.56.74z" opacity="1"></path><g fill="#40f2ff"><path d="M30.548 18.533a3.319 3.319 0 1 1 0-4.693 3.327 3.327 0 0 1 0 4.693z" fill="#40f2ff" opacity="1"></path><ellipse cx="37.574" cy="8.38" rx="3.31" ry="3.32" fill="#40f2ff" opacity="1"></ellipse><path d="M36.016 24a3.315 3.315 0 1 1-4.694 0 3.31 3.31 0 0 1 4.694 0zM53.977 24.771a3.311 3.311 0 1 1 0-4.681 3.294 3.294 0 0 1 0 4.681zM46.168 29.464a3.311 3.311 0 1 1-4.684 0 3.311 3.311 0 0 1 4.684 0z" fill="#40f2ff" opacity="1"></path></g></g></svg>
                        <a href="" className="app-name">CipherGuard</a>
                    </div>
                </div>
            </div>
            <Menu model={items} className="w-full" popup={false} />
        </div>
    );
};

export default Sidebar;