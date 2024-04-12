const Subscriber = require("../models/subscriberModel");

const addSubscriber = async (req, res) => {
  try {
    const { email, name } = req.body;
    const subscriber = await Subscriber.post(email, name);
    console.log(subscriber.email);
    res
      .status(201)
      .json({ message: "Subscriber added successfully", subscriber });
  } catch (error) {
    console.error("Error adding subscriber:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the subscriber" });
  }
};

const updateSubscriber = async (req, res) => {
  try {
    const { id, email, name } = req.body;
    const updatedSubscriber = await Subscriber.update(id, email, name);
    console.log(`type: ${updatedSubscriber.id}`);
    res
      .status(200)
      .json({ message: "Subscriber updated successfully", updatedSubscriber });
  } catch (error) {
    console.error("Error updating subscriber:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the subscriber" });
  }
};

const getSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const subscriber = await Subscriber.get(id);

    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }
    res.status(200).json(subscriber);
  } catch (error) {
    console.error("Error getting subscriber by ID:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the subscriber" });
  }
};

const getAll = async (req, res) => {
  try {
    const subscribers = await Subscriber.getAll();
    res.status(200).json(subscribers);
  } catch (error) {
    console.error("Error getting subscribers:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting subscribers" });
  }
};

const deleteSubscriber = async (req, res) => {
  try {
    await Subscriber.delete(req.params.id);
    res.json({ message: "Subscriber deleted" });
  } catch (error) {
    console.error("Error getting subscriber by ID:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the subscriber" });
  }
};

module.exports = {
  addSubscriber,
  updateSubscriber,
  getSubscriber,
  getAll,
  deleteSubscriber,
};
