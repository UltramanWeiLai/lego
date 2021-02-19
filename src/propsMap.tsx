import { VNode, h } from 'vue'
import { TextComponentProps } from './defaultProps'
export interface PropToForm {
    component: string;
    subComponent?: string;
    extraProps?: { [key: string]: any };
    text?: string;
    options?: { text: string | VNode; value: any }[];
    initalTransform?: (v: any) => any;
    afterTransform?: (v: any) => any;
    valueProp?: string;
    eventName?: string;
}

export type PropsToForms = {
    [P in keyof TextComponentProps]?: PropToForm
}
const fontFamilyArr = [
    { text: '宋体', value: '"SimSun","STSong"' },
    { text: '黑体', value: '"SimHei","STHeiti"' },
    { text: '楷体', value: '"KaiTi","STKaiti"' },
    { text: '仿宋', value: '"FangSong","STFangsong"' },
]
const borderStyleArr = [
    { text: '实线', value: 'solid' },
    { text: '虚线', value: 'dashed' },
    { text: '双线', value: 'double' },
    { text: '点状', value: 'dotted' },
]
const fontFamilyOptions = fontFamilyArr.map(font => {
    return {
        value: font.value,
        text: <span style={{ fontFamily: font.value}}>{font.text}</span> as VNode
    }
})
const borderStyleOptions = borderStyleArr.map(style => {
    return {
        value: style.value,
        text: <span style={{ width: '100%', margin: '15px 5px 0 5px', display: 'block', border: `1px ${style.value} #000`}}> </span> as VNode
    }
})
const pxToNumberHandler: PropToForm = {
    component: 'a-input-number',
    initalTransform: (v: string) => parseInt(v),
    afterTransform: (e: number) => e ? `${e}px` : '',
}
export const mapPropsToForms: PropsToForms = {
    text: {
        text: '文本',
        component: 'a-textarea',
        extraProps: { rows: 3 },
        afterTransform: (e: any) => e.target.value,
    },
    fontSize: {
        text: '字号',
        ...pxToNumberHandler
    },
    lineHeight: {
        text: '行高',
        component: 'a-slider',
        extraProps: { min: 0, max: 3, step: 0.1 },
        initalTransform: (v: string) => parseFloat(v),
        afterTransform: (e: number) => e.toString(),
    },
    textAlign: {
        component: 'a-radio-group',
        subComponent: 'a-radio-button',
        text: '对齐',
        options: [
            { value: 'left', text: '左' },
            { value: 'center', text: '中' },
            { value: 'right', text: '右' }
        ],
        afterTransform: (e: any) => e.target.value,
    },
    fontFamily: {
        component: 'a-select',
        subComponent: 'a-select-option',
        text: '字体',
        options: [
            { value: '', text: '无' },
            ...fontFamilyOptions
        ]
    },
    width: {
        text: '宽度',
        ...pxToNumberHandler
    },
    color: {
        component: 'color-picker',
        text: '字体颜色'
    },
    opacity: {
        text: '透明度',
        component: 'a-slider',
        extraProps: { min: 0, max: 100, step: 1, reverse: true },
        initalTransform: (v: string) => parseFloat(v) * 100,
        afterTransform: (e: number) => (e / 100).toString(),
    },
    borderStyle: {
        component: 'a-select',
        subComponent: 'a-select-option',
        text: '边框类型',
        options: [
            { value: '', text: '无' },
            ...borderStyleOptions
        ]
    },
    borderColor: {
        text: '边框颜色',
        component: 'a-radio-group',
        subComponent: 'a-radio-button',
        options: [
            { value: '', text: '无' },
            { value: 'red', text: '红' },
            { value: 'yellow', text: '黄' },
            { value: 'blue', text: '蓝' }
        ],
        afterTransform: (e: any) => e.target.value,
    },
    borderWidth: {
        text: '边框宽度',
        component: 'a-slider',
        extraProps: { min: 0, max: 5, step: 0.1 },
        initalTransform: (v: string) => parseFloat(v),
        afterTransform: (e: number) => e ? `${e}px` : '0',
    },
    borderRadius: {
        text: '边框圆角',
        component: 'a-slider',
        extraProps: { min: 0, max: 10, step: 0.1 },
        initalTransform: (v: string) => parseFloat(v),
        afterTransform: (e: number) => e ? `${e}px` : '0',
    }
}