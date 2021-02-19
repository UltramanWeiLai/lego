import { Module } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { GlobalDataProps } from './index'
import { TextComponentProps } from '@/defaultProps'

export interface ComponentData {
    id: string;
    name: string;
    props: { [key: string]: any };
}

export interface EditorProps {
    // 提供中间编辑器渲染的数组
    components: ComponentData[];
    currentElement: string[];
}

export const testComponents: ComponentData[] = [
    { id: uuidv4(), name: 'l-text', props: { text: 'hello', fontSize: '20px', color: 'red', 'lineHeight': '1', textAlign: 'left', fontFamily: '', opacity: '1', borderStyle: '', borderColor: '', borderWidth: '0',  borderRadius: '0'}},
    { id: uuidv4(), name: 'l-text', props: { text: 'hello2', fontSize: '10px', fontWeight: 'bold', 'lineHeight': '2', textAlign: 'left', fontFamily: '', opacity: '1' }},
    { id: uuidv4(), name: 'l-text', props: { text: 'hello3', fontSize: '15px', actionType: 'url', url: 'https://www.baidu.com', 'lineHeight': '3', textAlign: 'left', fontFamily: '', opacity: '1' }}
]

const editor: Module<EditorProps, GlobalDataProps> = {
    state: {
        components: testComponents,
        currentElement: []
    },
    mutations: {
        addComponent(state, props: Partial<TextComponentProps>) {
            const newComponent: ComponentData = {
                id: uuidv4(),
                name: 'l-text',
                props
            }
            state.components.push(newComponent)
        },
        updateComponent(state, { key, value}) {
            const updateComponent = state.components.find((component) => state.currentElement.includes(component.id))
            if(updateComponent) {
                updateComponent.props[key as keyof TextComponentProps] = value
            }
        },
        delComponent(state) {
            const deleteId = state.currentElement
            
            const newComponents = state.components.filter(component => !deleteId.includes(component.id))
            state.components.length = 0
            state.components.push(...newComponents)
        },
        setActive(state, id: string) {
            state.currentElement.length = 0
            state.currentElement.push(id)
        }
    },
    getters: {
        getCurrentElement: (state) => {
            return state.components.find((component) => state.currentElement.includes(component.id))
        }
    }
}

export default editor
