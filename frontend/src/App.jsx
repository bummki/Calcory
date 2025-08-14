import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Search, Settings, Calculator, Type, Hash, Download, Dice1 } from 'lucide-react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  
  // 도구 카테고리
  const toolCategories = [
    {
      id: 'text',
      name: '문자',
      icon: <Type className="w-4 h-4" />,
      tools: [
        { id: 'remove-html', name: 'HTML 태그 제거기', description: 'HTML 태그를 제거하고 순수 텍스트만 추출' },
        { id: 'count-chars', name: '글자수 문자수 계산기', description: '텍스트의 글자수, 문자수, 행수 등을 계산' },
        { id: 'convert-case', name: '영어 대문자 소문자 변환', description: '영어 텍스트를 대문자 또는 소문자로 변환' },
        { id: 'sort-words', name: '단어 글자 문자 정렬기', description: '단어를 알파벳순 또는 길이순으로 정렬' }
      ]
    },
    {
      id: 'word',
      name: '단어',
      icon: <Hash className="w-4 h-4" />,
      tools: [
        { id: 'word-list', name: '글자수별 단어 목록', description: '글자수별 영어/한국어 단어 목록 검색' },
        { id: 'generate-nickname', name: '캐릭터 이름 닉네임 생성기', description: '랜덤 캐릭터 이름 또는 닉네임 생성' },
        { id: 'extract-keywords', name: '키워드 추출 태그 생성기', description: '텍스트에서 주요 키워드를 추출하여 태그 생성' }
      ]
    },
    {
      id: 'media',
      name: '미디어',
      icon: <Download className="w-4 h-4" />,
      tools: [
        { id: 'download-video', name: '동영상 다운로드', description: '아프리카TV, 카카오TV, 네이버TV, 트위치 동영상 다운로드' },
        { id: 'download-images', name: '웹페이지 이미지 다운로드', description: '웹페이지의 모든 이미지를 추출하여 다운로드' },
        { id: 'generate-ffmpeg', name: 'FFmpeg 명령어 생성기', description: '동영상 변환, 압축 등을 위한 FFmpeg 명령어 생성' }
      ]
    },
    {
      id: 'calc',
      name: '계산',
      icon: <Calculator className="w-4 h-4" />,
      tools: [
        { id: 'stock-calc', name: '주식 코인 물타기 계산기', description: '주식/코인 물타기 시 평균 단가 계산' },
        { id: 'profit-calc', name: '주식 코인 수익률 계산기', description: '투자 수익률 계산' },
        { id: 'percent-calc', name: '퍼센트 확률 계산기', description: '퍼센트 및 확률 계산' },
        { id: 'dday-calc', name: '날짜 경과일 디데이 계산기', description: '특정 날짜까지의 D-day 계산' }
      ]
    },
    {
      id: 'game',
      name: '기타',
      icon: <Dice1 className="w-4 h-4" />,
      tools: [
        { id: 'investment-fortune', name: '오늘의 투자운세', description: '오늘의 투자 운세를 확인' },
        { id: 'lotto-gen', name: '로또 조합기 생성기', description: '로또 번호 조합 생성' },
        { id: 'dice-roll', name: '주사위 놀이', description: '가상 주사위 굴리기' }
      ]
    }
  ]

  // 검색 필터링
  const filteredCategories = toolCategories.map(category => ({
    ...category,
    tools: category.tools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.tools.length > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Settings className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">웹툴</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                [전체 메뉴]
              </Button>
              <Button variant="outline" size="sm">
                [웹툴 피드백]
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 히어로 섹션 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-lg mb-4">
            <Settings className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">웹툴 - Web에서 사용하는 Tool</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            인터넷에서 클릭 한번만으로 필요한 유용한 해결하는 간편하고 정확한 웹툴을 개발하여 제공하는 사이트입니다.
          </p>
        </div>

        {/* 도구 카테고리 */}
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {toolCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                {category.icon}
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {toolCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* 검색 결과 */}
        {searchTerm && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">검색 결과</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCategories.flatMap(category => 
                category.tools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// 도구 카드 컴포넌트
function ToolCard({ tool }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setIsOpen(true)}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{tool.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-xs">{tool.description}</CardDescription>
        </CardContent>
      </Card>

      {/* 도구 모달 */}
      {isOpen && (
        <ToolModal 
          tool={tool} 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  )
}

// 도구 모달 컴포넌트
function ToolModal({ tool, isOpen, onClose }) {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [additionalInputs, setAdditionalInputs] = useState({})

  const handleSubmit = async () => {
    setLoading(true)
    try {
      let requestData = { text: input, ...additionalInputs }
      
      // 특정 도구에 대한 특별한 처리
      if (tool.id === 'investment-fortune') {
        const response = await fetch(`/api/tools/investment-fortune`, {
          method: 'GET',
        })
        const data = await response.json()
        if (data.success) {
          setResult(typeof data.result === 'object' ? JSON.stringify(data.result, null, 2) : data.result)
        } else {
          setResult('오류가 발생했습니다: ' + data.error)
        }
      } else {
        // tool.id를 백엔드 엔드포인트에 맞게 변환
        let endpoint = tool.id
        switch (tool.id) {
          case 'stock-calc':
            endpoint = 'calculate-stock'
            break
          case 'profit-calc':
            endpoint = 'calculate-profit'
            break
          case 'percent-calc':
            endpoint = 'calculate-percent'
            break
          case 'dday-calc':
            endpoint = 'calculate-dday'
            break
          case 'lotto-gen':
            endpoint = 'generate-lotto'
            break
          case 'dice-roll':
            endpoint = 'roll-dice'
            break
        }
        
        const response = await fetch(`/api/tools/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        })
        
        const data = await response.json()
        if (data.success) {
          setResult(typeof data.result === 'object' ? JSON.stringify(data.result, null, 2) : data.result)
        } else {
          setResult('오류가 발생했습니다: ' + data.error)
        }
      }
    } catch (error) {
      setResult('네트워크 오류가 발생했습니다.')
    }
    setLoading(false)
  }

  const renderAdditionalInputs = () => {
    switch (tool.id) {
      case 'download-video':
        return (
          <div>
            <Label htmlFor="url">동영상 URL</Label>
            <Input
              id="url"
              value={additionalInputs.url || ''}
              onChange={(e) => setAdditionalInputs({...additionalInputs, url: e.target.value})}
              placeholder="https://..."
            />
          </div>
        )
      case 'download-images':
        return (
          <div>
            <Label htmlFor="url">웹페이지 URL</Label>
            <Input
              id="url"
              value={additionalInputs.url || ''}
              onChange={(e) => setAdditionalInputs({...additionalInputs, url: e.target.value})}
              placeholder="https://..."
            />
          </div>
        )
      case 'generate-ffmpeg':
        return (
          <div className="space-y-2">
            <div>
              <Label htmlFor="operation">작업 유형</Label>
              <select 
                id="operation"
                value={additionalInputs.operation || 'convert'}
                onChange={(e) => setAdditionalInputs({...additionalInputs, operation: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="convert">변환</option>
                <option value="resize">크기 조정</option>
                <option value="compress">압축</option>
                <option value="extract_audio">오디오 추출</option>
                <option value="cut">자르기</option>
              </select>
            </div>
            <div>
              <Label htmlFor="input_file">입력 파일명</Label>
              <Input
                id="input_file"
                value={additionalInputs.input_file || 'input.mp4'}
                onChange={(e) => setAdditionalInputs({...additionalInputs, input_file: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="output_file">출력 파일명</Label>
              <Input
                id="output_file"
                value={additionalInputs.output_file || 'output.mp4'}
                onChange={(e) => setAdditionalInputs({...additionalInputs, output_file: e.target.value})}
              />
            </div>
          </div>
        )
      case 'word-list':
        return (
          <div className="space-y-2">
            <div>
              <Label htmlFor="language">언어</Label>
              <select 
                id="language"
                value={additionalInputs.language || 'korean'}
                onChange={(e) => setAdditionalInputs({...additionalInputs, language: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="korean">한국어</option>
                <option value="english">영어</option>
              </select>
            </div>
            <div>
              <Label htmlFor="length">글자수</Label>
              <Input
                id="length"
                type="number"
                value={additionalInputs.length || 3}
                onChange={(e) => setAdditionalInputs({...additionalInputs, length: parseInt(e.target.value)})}
              />
            </div>
          </div>
        )
      case 'stock-calc':
        return (
          <div className="space-y-2">
            <div>
              <Label htmlFor="current_quantity">현재 수량</Label>
              <Input
                id="current_quantity"
                type="number"
                value={additionalInputs.current_quantity || 0}
                onChange={(e) => setAdditionalInputs({...additionalInputs, current_quantity: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="current_avg_price">현재 평균 단가</Label>
              <Input
                id="current_avg_price"
                type="number"
                value={additionalInputs.current_avg_price || 0}
                onChange={(e) => setAdditionalInputs({...additionalInputs, current_avg_price: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="additional_quantity">추가 매수 수량</Label>
              <Input
                id="additional_quantity"
                type="number"
                value={additionalInputs.additional_quantity || 0}
                onChange={(e) => setAdditionalInputs({...additionalInputs, additional_quantity: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="additional_price">추가 매수 단가</Label>
              <Input
                id="additional_price"
                type="number"
                value={additionalInputs.additional_price || 0}
                onChange={(e) => setAdditionalInputs({...additionalInputs, additional_price: parseFloat(e.target.value)})}
              />
            </div>
          </div>
        )
      case 'profit-calc':
        return (
          <div className="space-y-2">
            <div>
              <Label htmlFor="buy_price">매수 단가</Label>
              <Input
                id="buy_price"
                type="number"
                value={additionalInputs.buy_price || 0}
                onChange={(e) => setAdditionalInputs({...additionalInputs, buy_price: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="sell_price">매도 단가</Label>
              <Input
                id="sell_price"
                type="number"
                value={additionalInputs.sell_price || 0}
                onChange={(e) => setAdditionalInputs({...additionalInputs, sell_price: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="quantity">수량</Label>
              <Input
                id="quantity"
                type="number"
                value={additionalInputs.quantity || 0}
                onChange={(e) => setAdditionalInputs({...additionalInputs, quantity: parseFloat(e.target.value)})}
              />
            </div>
          </div>
        )
      case 'percent-calc':
        return (
          <div className="space-y-2">
            <div>
              <Label htmlFor="total_value">전체 값</Label>
              <Input
                id="total_value"
                type="number"
                value={additionalInputs.total_value || 0}
                onChange={(e) => setAdditionalInputs({...additionalInputs, total_value: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="part_value">부분 값</Label>
              <Input
                id="part_value"
                type="number"
                value={additionalInputs.part_value || 0}
                onChange={(e) => setAdditionalInputs({...additionalInputs, part_value: parseFloat(e.target.value)})}
              />
            </div>
          </div>
        )
      case 'dday-calc':
        return (
          <div>
            <Label htmlFor="target_date">목표 날짜</Label>
            <Input
                id="target_date"
                type="date"
                value={additionalInputs.target_date || ''}
                onChange={(e) => setAdditionalInputs({...additionalInputs, target_date: e.target.value})}
              />
            </div>
          </div>
        )
      case 'lotto-gen':
        return (
          <div>
            <Label htmlFor="count">생성할 로또 조합 수</Label>
            <Input
              id="count"
              type="number"
              value={additionalInputs.count || 1}
              onChange={(e) => setAdditionalInputs({...additionalInputs, count: parseInt(e.target.value)})}
            />
          </div>
        )
      case 'dice-roll':
        return (
          <div>
            <Label htmlFor="num_dice">주사위 개수</Label>
            <Input
              id="num_dice"
              type="number"
              value={additionalInputs.num_dice || 1}
              onChange={(e) => setAdditionalInputs({...additionalInputs, num_dice: parseInt(e.target.value)})}
            />
          </div>
        )
      default:
        return (
          <div>
            <Label htmlFor="input">입력</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="여기에 텍스트를 입력하세요."
            />
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{tool.name}</h2>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>
        <div className="space-y-4">
          {tool.id === 'investment-fortune' || tool.id === 'lotto-gen' || tool.id === 'dice-roll' ? null : (
            <div>
              <Label htmlFor="input">입력</Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="여기에 텍스트를 입력하세요."
              />
            </div>
          )}
          {renderAdditionalInputs()}
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? '처리 중...' : '실행'}
          </Button>
          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="font-semibold mb-2">결과:</h3>
              <pre className="whitespace-pre-wrap text-sm">{result}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
itionalInputs, target_date: e.target.value})}
              />
            </div>
          </div>
        )
      case 'lotto-gen':
        return (
          <div>
            <Label htmlFor="count">생성할 로또 조합 수</Label>
            <Input
              id="count"
              type="number"
              value={additionalInputs.count || 1}
              onChange={(e) => setAdditionalInputs({...additionalInputs, count: parseInt(e.target.value)})}
            />
          </div>
        )
      case 'dice-roll':
        return (
          <div>
            <Label htmlFor="num_dice">주사위 개수</Label>
            <Input
              id="num_dice"
              type="number"
              value={additionalInputs.num_dice || 1}
              onChange={(e) => setAdditionalInputs({...additionalInputs, num_dice: parseInt(e.target.value)})}
            />
          </div>
        )
      default:
        return (
          <div>
            <Label htmlFor="input">입력</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="여기에 텍스트를 입력하세요."
            />
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{tool.name}</h2>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>
        <div className="space-y-4">
          {tool.id === 'investment-fortune' || tool.id === 'lotto-gen' || tool.id === 'dice-roll' ? null : (
            <div>
              <Label htmlFor="input">입력</Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="여기에 텍스트를 입력하세요."
              />
            </div>
          )}
          {renderAdditionalInputs()}
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? '처리 중...' : '실행'}
          </Button>
          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="font-semibold mb-2">결과:</h3>
              <pre className="whitespace-pre-wrap text-sm">{result}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
     </div>
        )
      case 'lotto-gen':
        return (
          <div>
            <Label htmlFor="count">생성할 로또 조합 수</Label>
            <Input
              id="count"
              type="number"
              value={additionalInputs.count || 1}
              onChange={(e) => setAdditionalInputs({...additionalInputs, count: parseInt(e.target.value)})}
            />
          </div>
        )
      case 'dice-roll':
        return (
          <div>
            <Label htmlFor="num_dice">주사위 개수</Label>
            <Input
              id="num_dice"
              type="number"
              value={additionalInputs.num_dice || 1}
              onChange={(e) => setAdditionalInputs({...additionalInputs, num_dice: parseInt(e.target.value)})}
            />
          </div>
        )
      default:
        return (
          <div>
            <Label htmlFor="input">입력</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="여기에 텍스트를 입력하세요."
            />
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{tool.name}</h2>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>
        <div className="space-y-4">
          {tool.id === 'investment-fortune' || tool.id === 'lotto-gen' || tool.id === 'dice-roll' ? null : (
            <div>
              <Label htmlFor="input">입력</Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="여기에 텍스트를 입력하세요."
              />
            </div>
          )}
          {renderAdditionalInputs()}
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? '처리 중...' : '실행'}
          </Button>
          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="font-semibold mb-2">결과:</h3>
              <pre className="whitespace-pre-wrap text-sm">{result}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
ase 'lotto-gen':
        return (
          <div>
            <Label htmlFor="count">생성할 로또 조합 수</Label>
            <Input
              id="count"
              type="number"
              value={additionalInputs.count || 1}
              onChange={(e) => setAdditionalInputs({...additionalInputs, count: parseInt(e.target.value)})}
            />
          </div>
        )
      case 'dice-roll':
        return (
          <div className="space-y-2">
            <div>
              <Label htmlFor="dice_count">주사위 개수</Label>
              <Input
                id="dice_count"
                type="number"
                value={additionalInputs.dice_count || 1}
                onChange={(e) => setAdditionalInputs({...additionalInputs, dice_count: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="sides">주사위 면 수</Label>
              <Input
                id="sides"
                type="number"
                value={additionalInputs.sides || 6}
                onChange={(e) => setAdditionalInputs({...additionalInputs, sides: parseInt(e.target.value)})}
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{tool.name}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
          <CardDescription>{tool.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderAdditionalInputs()}
          
          {!['investment-fortune', 'stock-calc', 'profit-calc', 'percent-calc', 'dday-calc', 'lotto-gen', 'dice-roll'].includes(tool.id) && (
            <div>
              <Label htmlFor="input">입력</Label>
              <Textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="내용을 입력하세요..."
                rows={4}
              />
            </div>
          )}
          
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? '처리 중...' : '실행'}
          </Button>
          
          {result && (
            <div>
              <Label htmlFor="result">결과</Label>
              <Textarea
                id="result"
                value={result}
                readOnly
                rows={6}
                className="bg-gray-50"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default App

