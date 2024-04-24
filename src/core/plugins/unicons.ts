//@ts-ignore
import * as unicons from 'vue-unicons/dist/icons';

import Unicon from 'vue-unicons';
import app from '../../config/configApp';

const icons: any[] = [];
Object.values(unicons).map((icon: any) => icons.push(icon));

Unicon.add(icons);
//@ts-ignore
app.use(Unicon);
