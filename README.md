# 🐍 Reptile Classification using ResNet50

## 📌 Background

Reptiles play an important role in ecosystems as **natural predators** and **indicators of environmental health**. They help control pest populations such as rodents and reflect habitat stability. However, detecting reptiles manually is often challenging due to their hidden nature and slow movements.

With the help of **Computer Vision technology**, detecting and identifying reptiles through images can now be done automatically and more efficiently.

---

## 🎯 Objectives

- Develop an image classification system to automatically recognize and identify various reptile species.
- Improve **accuracy and efficiency** in the identification process compared to manual methods.

---

## 🌟 Benefits

- Provide a **digital tool** to support wildlife conservation efforts.
- Assist researchers and environmentalists in monitoring reptile biodiversity.
- Promote the use of **AI for nature preservation**.

---

## 🐾 System Targets

The system is designed to recognize and distinguish the following **8 species of reptiles and amphibians** from images:

1. Chameleon 🦎
2. Crocodile 🐊
3. Toad 🐸
4. Iguana 🦎
5. Lizard
6. Salamander
7. Snake 🐍
8. Turtle 🐢

---

## 🗂️ Dataset

The dataset used in this project is from Kaggle:

🔗 [Reptiles and Amphibians Image Dataset - Kaggle](https://www.kaggle.com/datasets/vencerlanz09/reptiles-and-amphibians-image-dataset)

---

## 🧠 Model Overview

The model is based on **ResNet50**, a pretrained convolutional neural network from ImageNet. The training pipeline includes:

1. Image preprocessing to 224x224 pixels
2. Feature extraction using `ResNet50` (without the top layer)
3. Custom classification head:
   - `GlobalAveragePooling2D`
   - `Dropout(0.3)`
   - `Dense(8, activation='softmax')`
4. Model compilation using:
   - Optimizer: Adam
   - Loss: Categorical Crossentropy
   - Metric: Accuracy

---

## 📊 Results

The final model achieved:

> **🎯 Validation Accuracy: 89.61%**

This indicates strong performance in classifying the 8 reptile and amphibian classes based on image inputs.

---

## ✅ Conclusion

The ResNet50-based image classifier performs highly accurately in identifying various reptile species. This system can be extended to:

- Support educational and conservation activities
- Be integrated into web monitoring systems
- Serve as a baseline for future wildlife classification models

---
