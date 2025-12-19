import { ChangedProps, HomeAssistant } from '../types/homeassistant';

export function hasConfigChanged(hass: HomeAssistant, changedProps: ChangedProps): boolean {
  if (changedProps.has('_config')) {
    return true;
  }

  if (!changedProps.has('hass')) {
    return false;
  }

  const oldHass = changedProps.get('hass');
  if (!oldHass) {
    return true;
  }

  if (
    oldHass.connected !== hass.connected ||
    oldHass.themes !== hass.themes ||
    oldHass.locale !== hass.locale ||
    oldHass.localize !== hass.localize ||
    oldHass.formatEntityState !== hass.formatEntityState ||
    oldHass.formatEntityAttributeName !== hass.formatEntityAttributeName ||
    oldHass.formatEntityAttributeValue !== hass.formatEntityAttributeValue ||
    oldHass.config.state !== hass.config.state
  ) {
    return true;
  }
  return false;
}

function compareEntityState(oldHass: HomeAssistant, newHass: HomeAssistant, entityId: string) {
  const oldState = oldHass.states[entityId];
  const newState = newHass.states[entityId];

  return oldState !== newState;
}

function compareEntityDisplayEntry(
  oldHass: HomeAssistant,
  newHass: HomeAssistant,
  entityId: string
) {
  const oldEntity = oldHass.entities[entityId];
  const newEntity = newHass.entities[entityId];

  return oldEntity?.display_precision !== newEntity?.display_precision;
}

export function hasEntityChanged(
  hass: HomeAssistant,
  changedProps: ChangedProps,
  entity: string | string[]
) {
  if (!changedProps.has('hass')) {
    return false;
  }

  const oldHass = changedProps.get('hass')!;
  const newHass = hass;

  const entities = Array.isArray(entity) ? entity : [entity];

  return entities.some((entityId) => {
    return (
      compareEntityState(oldHass, newHass, entityId) ||
      compareEntityDisplayEntry(oldHass, newHass, entityId)
    );
  });
}
