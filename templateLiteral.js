const firstName = 'Yagnesh';

const lastName = 'Modh';

// Yagnesh Modh;

// const fullName = firstName + ' ' + lastName;

const fullName = `${firstName} ${lastName}`

console.log(fullName);

// yagnesh's car

// const pos = firstName + '\'s car';

const pos = `${firstName}'s car`

console.log(pos);

// Yagnesh
// Modh

// const newLineName = firstName + '\n' + lastName;
const newLineName = `${firstName}
${lastName}`

console.log(newLineName);


const title = 'Portfolio'

const oldHtml = '<!DOCTYPE html>' +
'\n<html lang="en">' +
'\n<head>' +
    '\n\t<meta charset="UTF-8">' +
    '\n\t<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
    '\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '\n\t<title>' + title + '</title>' +
'\n</head>' +
'\n<body>' +
    '\n' +
'\n</body>' +
'\n</html>';

console.log(oldHtml);

const newHmtl = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body>
    
</body>
</html>`

console.log(newHmtl);