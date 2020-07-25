let idCounter = 0;

export class EntityComponent {
    constructor(id, schema) {
        this._uniqueId = 0;
        this._id = id;
        this._schema = schema;
        this._data = {};
    }

    get id() {
        return this._id;
    }

    get schema() {
        return this._schema;
    }

    get uniqueId() {
        return this._uniqueId;
    }

    get description() {
        return this.schema.description;
    }

    get data() {
        return this._data;
    }

    set data(d) {
        this._data = d;
    }

    hasProperties() {
        return (this.schema.properties && this.schema.properties.length !== 0) || this.schema.anyOf || this.schema.$ref;
    }

    clone() {
        let clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        clone.data = {};
        clone._uniqueId = idCounter++;
        return clone;
    }

}