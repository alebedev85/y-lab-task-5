import StoreModule from "../module";

class AuthState extends StoreModule {

  initState() {
    const token = localStorage.getItem('token');
    const username = token ? localStorage.getItem('username') : '';
    return {
      token,
      user: {},
      username,
      waiting: false
    }
  }

  async login(login, password) {
    this.setState({
      token: null,
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/users/sign`,
        {
          method: 'POST',
          body: JSON.stringify({
            login,
            password,
            remember: true
          }), headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.error.data.issues[0].message);
      }

      // Токен получен
      this.setState({
        error: null,
        ...json.result,
        user: json.result.user,
        username: json.result.user.profile.name,
        waiting: false
      }, 'Получен token');
      localStorage.setItem('token', json.result.token)
      localStorage.setItem('username', json.result.user.profile.name)
      return json.result.token;
    } catch (e) {
      console.log('e: ', e);
      // Ошибка при загрузке
      this.setState({
        error: e.message,
        waiting: false
      });
    }
  }
  async logout() {
    try {
      const response = await fetch(`/api/v1/users/sign`,
        {
          method: 'DELETE',
          body: JSON.stringify({
            "remember": true
          }), headers: {
            'X-Token': this.getState().token,
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      const json = await response.json();

      // Удаляем все данные
      this.setState({
        token: null,
        username: null,
        profile: null,
        waiting: false
      }, 'SignOut');
      localStorage.removeItem('token');
      localStorage.removeItem('username');

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        token: null,
        waiting: false
      });
    }
  }

  async loadProfile() {
    const token = this.getState().token
    if (!token) return;

    try {
      const response = await fetch(`/api/v1/users/self?fields=*`,
        {
          method: 'GET',
          headers: {
            'X-Token': token,
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.error.data.issues[0].message);
      }

      // Токен получен
      this.setState({
        error: null,
        token,
        user: { ...json.result },
        username: json.result.profile.name,
        waiting: false
      }, 'Получены данные пользователя из API');

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        error: e.error,
        waiting: false
      }, 'Ошибка получения данных пользователя из API');
    }
  }

}

export default AuthState;