//init legend panel
let panel = new Panel('Get you disease');
ui.addControl('panel', panel);

let disease = [
    'Hepatitis',
    'Measles',
    'Mumps',
    'Pertussi',
    'Polio',
    'Rubella',
    'Smallpox'
];

let select = new Select([0, 1, 2, 3, 4, 5, 6].reduce(
    (values, v) => {
        values[v] = `${disease[v]}`;
        return values;
    }, {}
));
panel.addChild(select);


