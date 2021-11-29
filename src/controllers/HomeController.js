class HomeController {
  async index(req, res) {
    res.json('Home Controller');
  }
}

export default new HomeController();
