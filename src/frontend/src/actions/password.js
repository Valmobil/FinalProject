export const SAVE_NEW_PASSWORD = 'SAVE_NEW_PASSWORD'
export const SAVE_NEW_CONFIRM_PASSWORD = 'SAVE_NEW_CONFIRM_PASSWORD'
export const POST_NEW_PASSWORD_REQUESTED = 'POST_NEW_PASSWORD_REQUESTED'
export const POST_NEW_PASSWORD_SUCCEEDED = 'POST_NEW_PASSWORD_SUCCEEDED'
export const POST_NEW_PASSWORD_FAILED = 'POST_NEW_PASSWORD_FAILED'

// SAVE_NEW_PASSWORD – сохранить в store новый пароль
// SAVE_NEW_CONFIRM_PASSWORD – сохранить в store подтверждение нового пароля
// POST_NEW_PASSWORD_REQUESTED– запрос отправлен на бэк (можем крутить placeholder, пока не получим ответа с бєка)
// POST_ NEW_PASSWORD_SUCCEEDED – запрос завершился успешно, бэк ответил, что новый паспорт сохранен (можно на интерфейсе что-то поделать, вывести сообщение об успешности операции)
// POST_ NEW_PASSWORD_FAILED – запрос завершился с ошибкой, бэк вернул error (аналогично можно что-то на интерейсе поделать, вывести ошибку и попросить попробовать еще раз)