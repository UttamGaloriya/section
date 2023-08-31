export interface SelectItem {
    checks?: CheckItem[];
    name: string;
    orderNumber: number;
    id: string;
    showEditState?: boolean;
    showAddCheck?: boolean;
    isHovered?: boolean;
    isCheckAll?: boolean
};
export interface CheckItem {
    check: string;
    orderNumber: number;
    id: string;
    showEditState?: boolean;
    showAddCheck?: boolean;
    isHovered?: boolean;
    isCheck?: boolean
}


export const selectData: SelectItem[] = [
    {
        name: 'Test 1',
        orderNumber: 4,
        id: 'a11',
        checks: [{
            check: 'check 1',
            orderNumber: 1,
            id: 'aa111'
        }, {
            check: 'check 1',
            orderNumber: 1,
            id: 'aa111'
        }, {
            check: 'check 1',
            orderNumber: 1,
            id: 'aa111'
        }, {
            check: 'check 1',
            orderNumber: 1,
            id: 'aa111'
        }]
    }, {
        name: 'Test 1',
        orderNumber: 4,
        id: 'a11',
        checks: [{
            check: 'check 1',
            orderNumber: 1,
            id: 'aa111'
        }, {
            check: 'check 1',
            orderNumber: 1,
            id: 'aa111'
        }, {
            check: 'check 1',
            orderNumber: 1,
            id: 'aa111'
        }, {
            check: 'check 1',
            orderNumber: 1,
            id: 'aa111'
        }]
    },
    {
        name: 'Test 1',
        orderNumber: 4,
        id: 'a11',
        checks: [{
            check: 'check 1',
            orderNumber: 1,
            id: 'aa111'
        }, {
            check: 'check 1',
            orderNumber: 1,
            id: 'aa111'
        }, {
            check: 'check 1',
            orderNumber: 1,
            id: 'aa111'
        }, {
            check: 'check 1',
            orderNumber: 1,
            id: 'aa111'
        }]
    }
]


