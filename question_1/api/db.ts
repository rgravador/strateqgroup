import { Invoice } from "./types";
function getRandomDate() {
    const maxDate = Date.now();
    const timestamp = Math.floor(Math.random() * maxDate);
    return new Date(timestamp);
}
function getRandomAmount() {
    return Math.floor(Math.random() * 1000);
}
var db: Invoice[] = [
    {
        InvoiceNo: '1',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        CreatedDate: getRandomDate(),
        Amount: getRandomAmount(),
        Status: 'paid'
    },
    {
        InvoiceNo: '2',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        CreatedDate: getRandomDate(),
        Amount: getRandomAmount(),
        Status: 'paid'
    },
    {
        InvoiceNo: '3',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        CreatedDate: getRandomDate(),
        Amount: getRandomAmount(),
        Status: 'paid'
    },
    {
        InvoiceNo: '4',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        CreatedDate: getRandomDate(),
        Amount: getRandomAmount(),
        Status: 'paid'
    },
    {
        InvoiceNo: '5',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        CreatedDate: getRandomDate(),
        Amount: getRandomAmount(),
        Status: 'paid'
    },
    {
        InvoiceNo: '6',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        CreatedDate: getRandomDate(),
        Amount: getRandomAmount(),
        Status: 'paid'
    },
    {
        InvoiceNo: '7',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        CreatedDate: getRandomDate(),
        Amount: getRandomAmount(),
        Status: 'paid'
    },
    {
        InvoiceNo: '8',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        CreatedDate: getRandomDate(),
        Amount: getRandomAmount(),
        Status: 'paid'
    },
    {
        InvoiceNo: '9',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        CreatedDate: getRandomDate(),
        Amount: getRandomAmount(),
        Status: 'paid'
    },
    {
        InvoiceNo: '10',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        CreatedDate: getRandomDate(),
        Amount: getRandomAmount(),
        Status: 'paid'
    },
    {
        InvoiceNo: '11',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        CreatedDate: getRandomDate(),
        Amount: getRandomAmount(),
        Status: 'paid'
    }
]

export const getData = () => {
    return db;
}

export const addData = (data: any) => {
    let id = db.sort(function (a: any, b: any) { return parseInt(b.InvoiceNo) - parseInt(a.InvoiceNo) })[0].InvoiceNo
    db.push({
        InvoiceNo: `${parseInt(id) + 1}`,
        ...data,
        CreatedDate: new Date(),
        Status: 'paid'
    });
    return 'ok'
}

export const deleteData = async (InvoiceNo: string) => {
    db = await db.filter((item: Invoice) => item.InvoiceNo != InvoiceNo);
    return 'ok'
}

export const updateData = async (data: Invoice) => {
    db = await db.map((item: Invoice) => {
        if (item.InvoiceNo == data.InvoiceNo) {
            return data;
        } else {
            return item;
        }
    });

    return 'ok'
}