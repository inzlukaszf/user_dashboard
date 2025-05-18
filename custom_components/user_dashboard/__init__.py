__init__.pyimport logging
from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store
from .const import DOMAIN, STORAGE_KEY, STORAGE_VERSION, ASSIGN_SERVICE, UNASSIGN_SERVICE
from .services import async_assign, async_unassign
from .api import async_setup_api

_LOGGER = logging.getLogger(__name__)

async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the User Dashboard integration."""
    store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
    data = await store.async_load() or {}
    # assignments: { dashboard_name: [user1, user2, ...], ... }
    hass.data[DOMAIN] = {
        "store": store,
        "assignments": {k: set(v) for k, v in data.items()}
    }

    # Register services
    hass.services.async_register(
        DOMAIN,
        ASSIGN_SERVICE,
        lambda call: hass.async_create_task(async_assign(hass, call))
    )
    hass.services.async_register(
        DOMAIN,
        UNASSIGN_SERVICE,
        lambda call: hass.async_create_task(async_unassign(hass, call))
    )

    # Setup HTTP API
    await async_setup_api(hass)

    _LOGGER.info("User Dashboard Guard initialized.")
    return True
