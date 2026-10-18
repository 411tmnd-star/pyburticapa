# Capstone track: vision-language model

[Corpus](../../../README.md) / [projects](../../README.md)  ·  6 entries  ·  discovery 6

**Course:** [ai_engineering/phases/19-capstone-projects](../../../../course/ai_engineering/phases/19-capstone-projects)

| ID | Entry | Python | Needs | Status |
|---|---|---|---|---|
| L19-58 | [Vision Encoder Patches](../../../../course/ai_engineering/phases/19-capstone-projects/58-vision-encoder-patches "A vision model that reads pixels needs a tokenizer for pixels. Patch embedding is that tokenizer. Cut the image into a grid of squares, flat") | 2 files | numpy, torch | discovery |
| L19-59 | [Vision Transformer Encoder](../../../../course/ai_engineering/phases/19-capstone-projects/59-vit-transformer "Patches alone do not see. A 12-layer pre-LN transformer with 12 attention heads turns the sequence of patch tokens into a sequence of contex") | 2 files | numpy, torch | discovery |
| L19-60 | [Projection Layer for Modality Alignment](../../../../course/ai_engineering/phases/19-capstone-projects/60-projection-layer-modality-align "A vision encoder produces image tokens. A text decoder consumes text tokens. The two live in different vector spaces. A small two-layer MLP ") | 2 files | numpy, torch | discovery |
| L19-61 | [Cross-Attention Fusion](../../../../course/ai_engineering/phases/19-capstone-projects/61-cross-attention-fusion "The projection layer aligns one image vector with one caption vector. A real vision-language decoder needs every text token to attend to eve") | 2 files | torch | discovery |
| L19-62 | [Vision-Language Pretraining](../../../../course/ai_engineering/phases/19-capstone-projects/62-vision-language-pretraining "The encoder, projection, and decoder are wired. Now train them together. Two objectives drive learning: a contrastive image-text loss (InfoN") | 2 files | numpy, torch | discovery |
| L19-63 | [Multimodal Evaluation](../../../../course/ai_engineering/phases/19-capstone-projects/63-multimodal-eval "Training is half the loop. The other half is measurement. This lesson builds three evaluation surfaces from primitives: image-caption retrie") | 2 files | numpy, torch | discovery |
