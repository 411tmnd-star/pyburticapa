# How it works: Collective Ops From Scratch

## `main.py`

```text
Collective communication primitives over multiprocessing.Queue, verified against gloo.

Implements ring allreduce, tree broadcast, allgather, reduce_scatter on a queue
mesh that wires N ranks into a ring. Every primitive is checked byte-for-byte
against torch.distributed initialised with the gloo backend on the same tensor
and the same world size. The per-rank byte counter proves the 2T(N-1)/N
scaling of ring allreduce.

Run: python3 code/main.py

The mesh workers use the 'fork' multiprocessing context so child processes
inherit Queue file descriptors without pickling. The gloo reference workers
use 'spawn' because torch.distributed needs a clean process. Both contexts
ship in stdlib multiprocessing.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _loopback_iface()`](main.py#L32): Return the loopback interface name; macOS uses lo0, Linux uses lo.
- [`class Mesh`](main.py#L39): A point-to-point mesh wired as a fully-connected graph of queues.
  - [`def send(self, dst, tensor)`](main.py#L53)
  - [`def recv(self, src)`](main.py#L63)
- [`def build_queue_grid(ctx, world_size)`](main.py#L69): Allocate a (world_size, world_size) grid of queues using the given context.
- [`def mesh_from_grid(rank, world_size, grid, byte_counter)`](main.py#L79)
- [`def ring_allreduce(mesh, tensor)`](main.py#L87): Ring allreduce in two passes (reduce-scatter then allgather).
- [`def broadcast(mesh, tensor, src)`](main.py#L120): Tree broadcast in ceil(log2(world_size)) hops.
- [`def allgather(mesh, tensor)`](main.py#L149): Allgather via N-1 ring rotations.
- [`def reduce_scatter(mesh, tensor)`](main.py#L171): Reduce-scatter as the first half of ring allreduce.
- [`def _gloo_worker(rank, world_size, op, tensor_bytes, shape, dtype_str, init_file, iface, out_queue)`](main.py#L201)
- [`def gloo_reference(op, world_size, per_rank_tensors)`](main.py#L236): Run the same operation through torch.distributed gloo for verification.
- [`def _mesh_worker(rank, world_size, op, grid, byte_counter, tensor_bytes, shape, dtype_str, src, out_queue)`](main.py#L281)
- [`def run_mesh(op, world_size, per_rank_tensors, src)`](main.py#L300): Run the chosen primitive on the queue mesh and return per-rank outputs plus byte total.
- [`def verify_against_gloo(op, world_size, per_rank_tensors)`](main.py#L333): Compare mesh implementation against gloo reference, return (match, max_abs_diff).
- [`def main()`](main.py#L346)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
