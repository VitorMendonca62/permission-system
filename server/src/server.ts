import { App } from './app';

const PORT = process.env.PORT || 4257;

App.listen(PORT, () => console.log(`Server listing in port ${PORT}`));