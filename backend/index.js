import app from './app.js';
import {mongooseConnection} from './database/index.js'


mongooseConnection()
    .then(() => console.log('Connected successfully'))
    .catch((error) => console.log("Can't connect", error))

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    try {
        console.log(`listening to port ${PORT}`);
    }catch (error) {
        console.log(error);
    }
})