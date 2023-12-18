import StoreModule from "../module";

class ProfileState extends StoreModule {

  initState() {
    return {
      user: {},
      waiting: false
    }
  }

  async loadProfile(token, id) {
    if (!token) return null;
    if (!id) {
      id = 'self';
    }
    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/users/${id}?fields=*`,
        {
          method: 'GET',
          headers: {
            'X-Token': token,
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.error.user.issues[0].message);
      }

      // Токен получен
      this.setState({
        error: null,
        user: { ...json.result },
        waiting: false
      }, 'Получены данные профайла из API');

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        error: e.error,
        waiting: false
      }, 'Ошибка получения данных профайлы из API');
    }
  }

}

export default ProfileState;