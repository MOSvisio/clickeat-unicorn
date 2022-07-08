export class Unicorn {
    public id: number;
    public name: string;
    public color: string;
    public gender: string;
    public age: number; 

    public mate: number|null;

    constructor(data?: any) {
        if (!data) {
            data = [];
        }

        this.id = data.id ?? -1;
        this.name = data.name ?? null;
        this.color = data.color ?? null;
        this.gender = data.gender ?? null;
        this.age = data.age ? data.age : 1;
        this.mate = data.mate ?? null;
    }
}