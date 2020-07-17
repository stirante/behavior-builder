export function resolvePath(schema, path) {
    let split = path.substring(2).split("/");
    let current = schema;
    for (const s of split) {
        current = current[s];
    }
    return current;
}

export function getEmptyOfType(schema) {
    let def = schema.default;
    switch (schema.type) {
        case "string":
            return def ? def : "";
        case "object":
            return {};
        case "array":
        case "list":
            return def ? def : [];
        case "boolean":
            return def ? def === "true" : false;
        case "number":
        case "integer":
        case "decimal":
            return def ? def : 0;
    }
    return null;
}