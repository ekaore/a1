import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, address, phone, email, message } = body

    // Валидация данных
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Пожалуйста, заполните все обязательные поля' },
        { status: 400 }
      )
    }

    // Форматирование телефона (убираем все кроме цифр и +)
    const formattedPhone = phone.replace(/[^\d+]/g, '')

    // Подготовка данных для Bitrix24
    const bitrixData = {
      fields: {
        TITLE: name,
        NAME: name,
        ADDRESS: address || '',
        PHONE: [
          {
            VALUE: formattedPhone,
            VALUE_TYPE: 'WORK'
          }
        ],
        EMAIL: [
          {
            VALUE: email,
            VALUE_TYPE: 'HOME'
          }
        ],
        COMMENTS: message || '',
        SOURCE_ID: '25' // ID источника (можно настроить)
      },
      params: {
        REGISTER_SONET_EVENT: 'Y'
      }
    }

    // URL Bitrix24 API (можно вынести в переменные окружения)
    const bitrixUrl = process.env.BITRIX24_API_URL || 'https://pg19.bitrix24.ru/rest/96929/us36sin1geu4jbp9/crm.lead.add'

    // Отправка запроса в Bitrix24
    const response = await fetch(bitrixUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(bitrixData)
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Bitrix24 API error:', result)
      return NextResponse.json(
        { error: 'Ошибка при отправке формы. Пожалуйста, попробуйте позже.' },
        { status: 500 }
      )
    }

    // Проверка на ошибки в ответе Bitrix24
    if (result.error) {
      console.error('Bitrix24 API error:', result.error)
      return NextResponse.json(
        { error: 'Ошибка при отправке формы. Пожалуйста, попробуйте позже.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.',
        leadId: result.result
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.' },
      { status: 500 }
    )
  }
}
