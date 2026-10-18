# How it works: Object Detection — YOLO from Scratch

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def sigmoid(x)`](main.py#L7)
- [`def box_iou(boxes_a, boxes_b)`](main.py#L11)
- [`def nms(boxes, scores, iou_threshold)`](main.py#L30)
- [`def encode(box_xyxy, cell_x, cell_y, stride, anchor_wh)`](main.py#L44)
- [`def decode(tx_ty_tw_th, cell_x, cell_y, stride, anchor_wh)`](main.py#L60)
- [`class YOLOHead`](main.py#L69)
  - [`def forward(self, x)`](main.py#L76)
- [`def assign_targets(boxes_xyxy, classes, anchors, stride, grid_size, num_classes)`](main.py#L84)
- [`def yolo_loss(pred, target, has_obj, lambda_coord, lambda_obj, lambda_noobj, lambda_cls)`](main.py#L121)
- [`def postprocess(pred_tensor, anchors, stride, conf_threshold, iou_threshold)`](main.py#L155)
- [`def main()`](main.py#L189)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
