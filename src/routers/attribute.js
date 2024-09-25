import { Router } from 'express';
import { create_Attribute, get_Attributes_Products_All, get_Attributes_Products_ById } from '../controllers/attribute.js';

const Router_Attribute = Router();
Router_Attribute.get('/attribute', get_Attributes_Products_All)
Router_Attribute.post('/attribute', create_Attribute)
Router_Attribute.get('/attribute/:id', get_Attributes_Products_ById)
export default Router_Attribute;