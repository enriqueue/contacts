const app = require('./app');

app.listen( app.get('port') , () => {
    console.log(`Server running at port ${ app.get('port') }`);
})