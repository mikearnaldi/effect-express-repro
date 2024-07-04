import {Effect, Layer} from 'effect';
import {server} from './app';
import * as Exp from './express';
import * as Todo from './todo';

// =============================================================================
// Application
// =============================================================================

const MainLive = Exp.Live('127.0.0.1', 8888).pipe(
  Layer.merge(Todo.TodoRepository.Live)
);

server.pipe(
  Effect.zipRight(Effect.never),
  Effect.provide(MainLive),
  Effect.tapErrorCause(Effect.logError),
  Effect.runFork
);
