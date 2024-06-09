const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const env = require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
const mongoUri = process.env.MONGO_URI;
// const mongoUri = 'mongodb+srv://hannyvyas:hanny9054@cluster0.f9odr8p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Contact = mongoose.model('Contact', contactSchema);

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  clear() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data.name < node.data.name) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  inorder(node, contacts = []) {
    if (node !== null) {
      this.inorder(node.left, contacts);
      contacts.push(node.data);
      this.inorder(node.right, contacts);
    }
    return contacts;
  }

  getRootNode() {
    return this.root;
  }
}

const contactTree = new BinarySearchTree();

app.get('/contacts', async (req, res) => {
  try {
    contactTree.clear(); // Clear the tree before populating it
    const contacts = await Contact.find();
    contacts.forEach(contact => contactTree.insert(contact));
    res.json(contactTree.inorder(contactTree.getRootNode()));
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).send('Error fetching contacts');
  }
});

app.post('/contacts', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newContact = new Contact({ name, email });
    await newContact.save();
    res.status(201).send('Contact added');
  } catch (err) {
    console.error('Error adding contact:', err);
    res.status(500).send('Error adding contact');
  }
});

app.delete('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.status(200).send('Contact deleted');
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).send('Error deleting contact');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
