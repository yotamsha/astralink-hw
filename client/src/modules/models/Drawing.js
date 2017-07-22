import axios from 'axios';
import Consts from '../services/Consts';

const MODEL_PATH = 'drawings';

class Drawing {

  static getAll(){
    return axios.get(Consts.API_PREFIX + MODEL_PATH)
      .then(res => {
        return res.data;
      });
  }

  static getById(id){
    return axios.get(BASE_SERVER_URL + MODEL_PATH + '/' + id)
      .then(res => {
        return res.data;
      });

  }

  static save(data){
    if (data.id){ // ID exists,
      return axios.put(BASE_SERVER_URL + MODEL_PATH + '/' + data.id, data)
        .then(res => {
          return res.data;
        });
    } else { // no ID, create a new object.
      return axios.post(BASE_SERVER_URL + MODEL_PATH, data)
        .then(res => {
          return res.data;
        });
    }


  }

}

export default Drawing;
