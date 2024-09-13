import { TodoModel } from './immutable-app/actions/todo.model';

let initialState = <InitialState>{
    todos: <TodoModel[]>[{
        id: 1,
        name: 'test',
        description: 'test',
        nested: {
            value: 'nested test'
        }
    }],
    form: {
        condition: {
            new: true,
            used: false,
            notSpecified: false,
        },
        location: 'europe',
        cars: ['volvo', 'opel']
    },
    interpolationTest: 'initial',
    shareTest: <ShareTest>{
        testuu: {
            test: 1,
            testuu: 2
        },
        testValue: 'test value',
        testValue2: 'test value2'
    }
};

export interface InitialState {
    todos: any;
    form: Forms;
    interpolationTest: string;
    shareTest: ShareTest;
}

export interface ShareTest {
    testuu: {
        test: number;
        testuu: number;
    };
    testValue: string;
    testValue2: string;
}

export interface Forms {
    condition: {
        new: boolean,
        used: boolean,
        notSpecified: boolean,
    };
    location: string;
}

export { initialState };