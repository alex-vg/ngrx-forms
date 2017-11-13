import { Actions, MarkAsUnsubmittedAction } from '../../actions';
import { FormArrayState } from '../../state';
import { childReducer, computeArrayState, dispatchActionPerChild } from './util';

export function markAsUnsubmittedReducer<TValue>(
  state: FormArrayState<TValue>,
  action: Actions<TValue[]>,
): FormArrayState<TValue> {
  if (action.type !== MarkAsUnsubmittedAction.TYPE) {
    return state;
  }

  if (action.controlId !== state.id) {
    return childReducer(state, action);
  }

  if (state.isUnsubmitted) {
    return state;
  }

  return computeArrayState(
    state.id,
    dispatchActionPerChild(state.controls, controlId => new MarkAsUnsubmittedAction(controlId)),
    state.value,
    state.errors,
    state.pendingValidations,
    state.userDefinedProperties,
  );
}
