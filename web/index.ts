import { ParsedRequest, Theme, FileType } from '../api/_lib/types';
const { H, R, copee } = (window as any);
let timeout = -1;

interface ImagePreviewProps {
    src: string;
    onclick: () => void;
    onload: () => void;
    onerror: () => void;
    loading: boolean;
}

const ImagePreview = ({ src, onclick, onload, onerror, loading }: ImagePreviewProps) => {
    const style = {
        filter: loading ? 'blur(5px)' : '',
        opacity: loading ? 0.1 : 1,
    };
    const title = 'Click to copy image URL to clipboard';
    return H('a',
        { className: 'image-wrapper', href: src, onclick },
        H('img',
            { src, onload, onerror, style, title }
        )
    );
}

interface DropdownOption {
    text: string;
    value: string;
}

interface DropdownProps {
    options: DropdownOption[];
    value: string;
    onchange: (val: string) => void;
    small: boolean;
}

const Dropdown = ({ options, value, onchange, small }: DropdownProps) => {
    const wrapper = small ? 'select-wrapper small' : 'select-wrapper';
    const arrow = small ? 'select-arrow small' : 'select-arrow';
    return H('div',
        { className: wrapper },
        H('select',
            { onchange: (e: any) => onchange(e.target.value) },
            options.map(o =>
                H('option',
                    { value: o.value, selected: value === o.value },
                    o.text
                )
            )
        ),
        H('div',
            { className: arrow },
            '▼'
        )
    );
}

interface TextInputProps {
    value: string;
    oninput: (val: string) => void;
}

const TextInput = ({ value, oninput }: TextInputProps) => {
    return H('div',
        { className: 'input-outer-wrapper' },
        H('div',
            { className: 'input-inner-wrapper' },
            H('input',
                { type: 'text', value, oninput: (e: any) => oninput(e.target.value) }
            )
        )
    );
}

interface ButtonProps {
    label: string;
    onclick: () => void;
}

const Button = ({ label, onclick }: ButtonProps) => {
    return H('button', { onclick }, label);
}

interface FieldProps {
    label: string;
    input: any;
}

const Field = ({ label, input }: FieldProps) => {
    return H('div',
        { className: 'field' },
        H('label', 
            H('div', {className: 'field-label'}, label),
            H('div', { className: 'field-value' }, input),
        ),
    );
}

interface ToastProps {
    show: boolean;
    message: string;
}

const Toast = ({ show, message }: ToastProps) => {
    const style = { transform:  show ? 'translate3d(0,-0px,-0px) scale(1)' : '' };
    return H('div',
        { className: 'toast-area' },
        H('div',
            { className: 'toast-outer', style },
            H('div',
                { className: 'toast-inner' },
                H('div',
                    { className: 'toast-message'},
                    message
                )
            )
        ),
    );
}

const themeOptions: DropdownOption[] = [
    { text: 'Light', value: 'light' },
    { text: 'Dark', value: 'dark' },
];

const fileTypeOptions: DropdownOption[] = [
    { text: 'PNG', value: 'png' },
    { text: 'JPEG', value: 'jpeg' },
];

const fontSizeOptions: DropdownOption[] = Array
    .from({ length: 10 })
    .map((_, i) => i * 25)
    .filter(n => n > 0)
    .map(n => ({ text: n + 'px', value: n + 'px' }));

const markdownOptions: DropdownOption[] = [
    { text: 'Plain Text', value: '0' },
    { text: 'Markdown', value: '1' },
];

const imageLightOptions: DropdownOption[] = [
    { text: 'ZEIT', value: 'https://assets.zeit.co/image/upload/front/assets/design/zeit-black-triangle.svg' },
    { text: 'Next.js', value: 'https://assets.zeit.co/image/upload/front/assets/design/nextjs-black-logo.svg' },
    { text: 'Hyper', value: 'https://assets.zeit.co/image/upload/front/assets/design/hyper-color-logo.svg' },
    { text: 'hbg', value: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFk%0D%0Ab2JlIElsbHVzdHJhdG9yIDI0LjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246%0D%0AIDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5z%0D%0APSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMu%0D%0Ab3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQi%0D%0AIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMjQgMTAyNDsiIHhtbDpzcGFjZT0i%0D%0AcHJlc2VydmUiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik04NDEuOTksNDU5LjcxYy0zMS45OCwwLTU3%0D%0ALjg2LDM2Ljg3LTU3Ljg2LDgyLjUyYzAsMjcuMSwxNC44OSw0NS4xNywzNy42LDQ1LjE3YzMxLjAx%0D%0ALDAsNTcuODYtMzguMzMsNTcuODYtODIuNTIKCQkJQzg3OS41OCw0NzcuNTMsODY0LjY5LDQ1OS43%0D%0AMSw4NDEuOTksNDU5LjcxeiIvPgoJPC9nPgoJPGc+CgkJPHBhdGggZD0iTTUyNS4zMyw0NTcuMDNj%0D%0ALTMwLjc2LDAtNTcuODYsMzguNTctNTcuODYsODIuNzZjMCwyNy4zNCwxNC44OSw0NS4xNywzNy42%0D%0ALDQ1LjE3YzMxLjk4LDAsNTcuODYtMzYuODcsNTcuODYtODIuNzYKCQkJQzU2Mi45Myw0NzQuODUs%0D%0ANTQ4LjA0LDQ1Ny4wMyw1MjUuMzMsNDU3LjAzeiIvPgoJPC9nPgoJPGc+CgkJPHBhdGggZD0iTTc2%0D%0AOCwwSDI1NkMxMTQuNjIsMCwwLDExNC42MiwwLDI1NnY1MTJjMCwxNDEuMzgsMTE0LjYyLDI1Niwy%0D%0ANTYsMjU2aDUxMmMxNDEuMzgsMCwyNTYtMTE0LjYyLDI1Ni0yNTZWMjU2CgkJCUMxMDI0LDExNC42%0D%0AMiw5MDkuMzgsMCw3NjgsMHogTTMzOC44MSw0ODkuOThsLTM1LjE2LDE2Ny4yNGgtOTUuOTVsMzEu%0D%0AOTgtMTUyLjM0YzEuMjItNi4zNSwxLjcxLTExLjQ3LDEuNzEtMTYuNgoJCQljMC0xOC41NS0xNS4z%0D%0AOC0zMi4yMy0zNi42Mi0zMi4yM2MtMjMuMTksMC00My4yMSwxNy41OC00OC41OCw0Mi45N2wtMzMu%0D%0ANDUsMTU4LjJIMjYuMzFsNzQuOTUtMzUyLjI5aDk2LjE5bC0yNi42MSwxMjMuNTRoMS45NQoJCQlj%0D%0AMjAuMDItMjkuMyw1MC4yOS00Ni4xNCw4Ny42NS00Ni4xNGM0OS4zMiwwLDgyLjAzLDMwLjAzLDgy%0D%0ALjAzLDc0LjcxQzM0Mi40Nyw0NjcuMDQsMzQxLjI1LDQ3OC4yNywzMzguODEsNDg5Ljk4eiBNNTMx%0D%0ALjY4LDY2MS4xMwoJCQljLTM5LjMxLDAtNzAuOC0yMC4yNi04MS4wNS01MmgtMS45NWwtMTAuMjUs%0D%0ANDguMWgtOTQuMjRsNzUuMi0zNTIuMjloOTYuOTJsLTI2LjM3LDEyMS4wOWgyLjQ0YzE2LjYtMjYu%0D%0AODYsNDYuMzktNDIuMjQsODEuMy00Mi4yNAoJCQljNTUuMTgsMCw4OS4zNiwzOC44Miw4OS4zNiwx%0D%0AMDIuMDVDNjYzLjAzLDU4NS45Myw2MDYuNjMsNjYxLjEzLDUzMS42OCw2NjEuMTN6IE05NDMuMDYs%0D%0ANjY2Ljc0CgkJCWMtMTIuNDUsNTguMTEtNjcuODcsOTIuMjktMTUwLjE1LDkyLjI5Yy04My43NCww%0D%0ALTEzMy4wNi0zMi43MS0xMzMuNTQtODguMzhoOTMuNTFjMi45MywxNi4zNiwxOS41MywyNS44OCw0%0D%0ANS40MSwyNS44OAoJCQljMjcuODMsMCw0NC4xOS0xMS43Miw0OS4wNy0zNS4xNmwxMC4wMS00Ni4x%0D%0ANGgtNC44OGMtMTUuNjIsMjMuMTktNDMuMjEsMzUuODktNzcuNjQsMzUuODljLTUzLjQ3LDAtODku%0D%0AMzYtMzkuMDYtODkuMzYtOTcuNDEKCQkJYzAtOTMuNTEsNjAuMDYtMTY5LjkyLDEzMy41NC0xNjku%0D%0AOTJjMzYuNjIsMCw2NS40MywxOC44LDc0LjQ2LDQ4LjgzaDQuMzlsMTAuMjUtNDQuOTJoOTQuMjRM%0D%0AOTQzLjA2LDY2Ni43NHoiLz4KCTwvZz4KPC9nPgo8L3N2Zz4K' }
];

const imageDarkOptions: DropdownOption[] = [

    { text: 'ZEIT', value: 'https://assets.zeit.co/image/upload/front/assets/design/zeit-white-triangle.svg' },
    { text: 'Next.js', value: 'https://assets.zeit.co/image/upload/front/assets/design/nextjs-white-logo.svg' },
    { text: 'Hyper', value: 'https://assets.zeit.co/image/upload/front/assets/design/hyper-bw-logo.svg' },
];

const widthOptions = [
    { text: 'width', value: 'auto' },
    { text: '50', value: '50' },
    { text: '100', value: '100' },
    { text: '150', value: '150' },
    { text: '200', value: '200' },
    { text: '250', value: '250' },
    { text: '300', value: '300' },
    { text: '350', value: '350' },
];

const heightOptions = [
    { text: 'height', value: 'auto' },
    { text: '50', value: '50' },
    { text: '100', value: '100' },
    { text: '150', value: '150' },
    { text: '200', value: '200' },
    { text: '250', value: '250' },
    { text: '300', value: '300' },
    { text: '350', value: '350' },
];

interface AppState extends ParsedRequest {
    loading: boolean;
    showToast: boolean;
    messageToast: string;
    selectedImageIndex: number;
    widths: string[];
    heights: string[];
    overrideUrl: URL | null;
}

type SetState = (state: Partial<AppState>) => void;

const App = (_: any, state: AppState, setState: SetState) => {
    const setLoadingState = (newState: Partial<AppState>) => {
        window.clearTimeout(timeout);
        if (state.overrideUrl && state.overrideUrl !== newState.overrideUrl) {
            newState.overrideUrl = state.overrideUrl;
        }
        if (newState.overrideUrl) {
            timeout = window.setTimeout(() => setState({ overrideUrl: null }), 200);
        }

        setState({ ...newState, loading: true });
    };
    const {
        fileType = 'png',
        fontSize = '100px',
        theme = 'light',
        md = true,
        text = '**Hello** World',
        images=[imageLightOptions[0].value],
        widths=[],
        heights=[],
        showToast = false,
        messageToast = '',
        loading = true,
        selectedImageIndex = 0,
        overrideUrl = null,
    } = state;
    const mdValue = md ? '1' : '0';
    const imageOptions = theme === 'light' ? imageLightOptions : imageDarkOptions;
    const url = new URL(window.location.origin);
    url.pathname = `${encodeURIComponent(text)}.${fileType}`;
    url.searchParams.append('theme', theme);
    url.searchParams.append('md', mdValue);
    url.searchParams.append('fontSize', fontSize);
    for (let image of images) {
        url.searchParams.append('images', image);
    }
    for (let width of widths) {
        url.searchParams.append('widths', width);
    }
    for (let height of heights) {
        url.searchParams.append('heights', height);
    }

    return H('div',
        { className: 'split' },
        H('div',
            { className: 'pull-left' },
            H('div',
                H(Field, {
                    label: 'Theme',
                    input: H(Dropdown, {
                        options: themeOptions,
                        value: theme,
                        onchange: (val: Theme) => {
                            const options = val === 'light' ? imageLightOptions : imageDarkOptions
                            let clone = [...images];
                            clone[0] = options[selectedImageIndex].value;
                            setLoadingState({ theme: val, images: clone });
                        }
                    })
                }),
                H(Field, {
                    label: 'File Type',
                    input: H(Dropdown, {
                        options: fileTypeOptions,
                        value: fileType,
                        onchange: (val: FileType) => setLoadingState({ fileType: val })
                    })
                }),
                H(Field, {
                    label: 'Font Size',
                    input: H(Dropdown, {
                        options: fontSizeOptions,
                        value: fontSize,
                        onchange: (val: string) => setLoadingState({ fontSize: val })
                    })
                }),
                H(Field, {
                    label: 'Text Type',
                    input: H(Dropdown, {
                        options: markdownOptions,
                        value: mdValue,
                        onchange: (val: string) => setLoadingState({ md: val === '1' })
                    })
                }),
                H(Field, {
                    label: 'Text Input',
                    input: H(TextInput, {
                        value: text,
                        oninput: (val: string) => {
                            console.log('oninput ' + val);
                            setLoadingState({ text: val, overrideUrl: url });
                        }
                    })
                }),
                H(Field, {
                    label: 'Image 1',
                    input: H('div',
                        H(Dropdown, {
                            options: imageOptions,
                            value: imageOptions[selectedImageIndex].value,
                            onchange: (val: string) =>  {
                                let clone = [...images];
                                clone[0] = val;
                                const selected = imageOptions.map(o => o.value).indexOf(val);
                                setLoadingState({ images: clone, selectedImageIndex: selected });
                            }
                        }),
                        H('div',
                            { className: 'field-flex' },
                            H(Dropdown, {
                                options: widthOptions,
                                value: widths[0],
                                small: true,
                                onchange: (val: string) =>  {
                                    let clone = [...widths];
                                    clone[0] = val;
                                    setLoadingState({ widths: clone });
                                }
                            }),
                            H(Dropdown, {
                                options: heightOptions,
                                value: heights[0],
                                small: true,
                                onchange: (val: string) =>  {
                                    let clone = [...heights];
                                    clone[0] = val;
                                    setLoadingState({ heights: clone });
                                }
                            })
                        )
                    ),
                }),
                ...images.slice(1).map((image, i) => H(Field, {
                    label: `Image ${i + 2}`,
                    input: H('div',
                        H(TextInput, {
                            value: image,
                            oninput: (val: string) => {
                                let clone = [...images];
                                clone[i + 1] = val;
                                setLoadingState({ images: clone, overrideUrl: url });
                            }
                        }),
                        H('div',
                            { className: 'field-flex' },
                            H(Dropdown, {
                                options: widthOptions,
                                value: widths[i + 1],
                                small: true,
                                onchange: (val: string) =>  {
                                    let clone = [...widths];
                                    clone[i + 1] = val;
                                    setLoadingState({ widths: clone });
                                }
                            }),
                            H(Dropdown, {
                                options: heightOptions,
                                value: heights[i + 1],
                                small: true,
                                onchange: (val: string) =>  {
                                    let clone = [...heights];
                                    clone[i + 1] = val;
                                    setLoadingState({ heights: clone });
                                }
                            })
                        )
                    )
                })),
                H(Field, {
                    label: `Image ${images.length + 1}`,
                    input: H(Button, {
                        label: `Add Image ${images.length + 1}`,
                        onclick: () => {
                            const nextImage = images.length === 1
                                ? 'https://cdn.jsdelivr.net/gh/remojansen/logo.ts@master/ts.svg'
                                : '';
                            setLoadingState({ images: [...images, nextImage] })
                        }
                    }),
                }),
            )
        ),
        H('div',
            { className: 'pull-right' },
            H(ImagePreview, {
                src: overrideUrl ? overrideUrl.href : url.href,
                loading: loading,
                onload: () => setState({ loading: false }),
                onerror: () => {
                    setState({ showToast: true, messageToast: 'Oops, an error occurred' });
                    setTimeout(() => setState({ showToast: false }), 2000);
                },
                onclick: (e: Event) => {
                    e.preventDefault();
                    const success = copee.toClipboard(url.href);
                    if (success) {
                        setState({ showToast: true, messageToast: 'Copied image URL to clipboard' });
                        setTimeout(() => setState({ showToast: false }), 3000);
                    } else {
                        window.open(url.href, '_blank');
                    }
                    return false;
                }
            })
        ),
        H(Toast, {
            message: messageToast,
            show: showToast,
        })
    );
};

R(H(App), document.getElementById('app'));
