import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('http://voipapi.tagan.ru/statistic/rgbl/tariffs', {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      },
      // Добавляем cache для оптимизации
      next: { revalidate: 3600 } // Кешируем на 1 час
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Проверяем структуру ответа
    if (data.status && data.data && Array.isArray(data.data)) {
      return NextResponse.json({
        success: true,
        data: data.data
      })
    }

    return NextResponse.json(
      { error: 'Invalid data format from API' },
      { status: 500 }
    )

  } catch (error) {
    console.error('Tariffs API error:', error)
    return NextResponse.json(
      { 
        error: 'Ошибка при загрузке тарифов',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
