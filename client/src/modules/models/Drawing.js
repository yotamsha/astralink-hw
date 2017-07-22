import axios from 'axios';
import Consts from '../services/Consts';

const MODEL_PATH = 'drawings';
const BASE_PATH = Consts.API_PREFIX + MODEL_PATH
class Drawing {

  static getAll(){
    return axios.get(BASE_PATH)
      .then(res => {
        return res.data;
      });
  }

  static getById(id){
    return axios.get(BASE_PATH + '/' + id)
      .then(res => {
        return res.data;
      });

  }

  static save(data){
    if (data.id){ // ID exists,
      return axios.put(BASE_PATH + '/' + data.id, data)
        .then(res => {
          return res.data;
        });
    } else { // no ID, create a new object.
      return axios.post(BASE_PATH, data)
        .then(res => {
          return res.data;
        });
    }


  }

}

export default Drawing;
