from flask import Blueprint, request, jsonify
import re
import random
from datetime import datetime, timedelta
import requests
from bs4 import BeautifulSoup

tools_bp = Blueprint('tools', __name__)

@tools_bp.route('/remove-html', methods=['POST'])
def remove_html():
    """HTML 태그 제거기"""
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        # HTML 태그 제거
        clean_text = re.sub(r'<[^>]+>', '', text)
        
        return jsonify({
            'success': True,
            'result': clean_text
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@tools_bp.route('/count-chars', methods=['POST'])
def count_chars():
    """글자수 문자수 계산기"""
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        # 각종 카운트 계산
        char_count_with_space = len(text)
        char_count_without_space = len(text.replace(' ', '').replace('\n', '').replace('\t', ''))
        line_count = len(text.split('\n'))
        paragraph_count = len([p for p in text.split('\n\n') if p.strip()])
        manuscript_pages = char_count_with_space / 400  # 원고지 400자 기준
        
        return jsonify({
            'success': True,
            'result': {
                'char_count_with_space': char_count_with_space,
                'char_count_without_space': char_count_without_space,
                'line_count': line_count,
                'paragraph_count': paragraph_count,
                'manuscript_pages': round(manuscript_pages, 2)
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@tools_bp.route('/convert-case', methods=['POST'])
def convert_case():
    """영어 대문자 소문자 변환"""
    try:
        data = request.get_json()
        text = data.get('text', '')
        case_type = data.get('case_type', 'upper')  # 'upper' or 'lower'
        
        if case_type == 'upper':
            result = text.upper()
        else:
            result = text.lower()
        
        return jsonify({
            'success': True,
            'result': result
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@tools_bp.route('/sort-words', methods=['POST'])
def sort_words():
    """단어 글자 문자 정렬기"""
    try:
        data = request.get_json()
        text = data.get('text', '')
        sort_type = data.get('sort_type', 'alphabetical')  # 'alphabetical', 'length'
        
        words = text.split()
        
        if sort_type == 'alphabetical':
            sorted_words = sorted(words)
        elif sort_type == 'length':
            sorted_words = sorted(words, key=len)
        else:
            sorted_words = words
        
        result = ' '.join(sorted_words)
        
        return jsonify({
            'success': True,
            'result': result
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@tools_bp.route('/generate-nickname', methods=['POST'])
def generate_nickname():
    """캐릭터 이름 닉네임 생성기"""
    try:
        data = request.get_json()
        length = data.get('length', 6)
        
        # 간단한 닉네임 생성 로직
        consonants = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
        vowels = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ']
        
        nicknames = []
        for _ in range(5):  # 5개 생성
            nickname = ''
            for _ in range(length):
                if random.choice([True, False]):
                    nickname += random.choice(consonants)
                else:
                    nickname += random.choice(vowels)
            nicknames.append(nickname)
        
        return jsonify({
            'success': True,
            'result': nicknames
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@tools_bp.route('/extract-keywords', methods=['POST'])
def extract_keywords():
    """키워드 추출 태그 생성기"""
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        # 간단한 키워드 추출 (실제로는 더 복잡한 NLP 알고리즘 사용)
        words = re.findall(r'\b\w+\b', text.lower())
        word_freq = {}
        for word in words:
            if len(word) > 2:  # 2글자 이상만
                word_freq[word] = word_freq.get(word, 0) + 1
        
        # 빈도순으로 정렬하여 상위 10개 키워드 추출
        keywords = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)[:10]
        keyword_list = [word for word, freq in keywords]
        
        return jsonify({
            'success': True,
            'result': keyword_list
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@tools_bp.route('/calculate-stock', methods=['POST'])
def calculate_stock():
    """주식 코인 물타기 계산기"""
    try:
        data = request.get_json()
        current_quantity = float(data.get('current_quantity', 0))
        current_avg_price = float(data.get('current_avg_price', 0))
        additional_quantity = float(data.get('additional_quantity', 0))
        additional_price = float(data.get('additional_price', 0))
        
        # 물타기 계산
        total_quantity = current_quantity + additional_quantity
        total_investment = (current_quantity * current_avg_price) + (additional_quantity * additional_price)
        new_avg_price = total_investment / total_quantity if total_quantity > 0 else 0
        
        return jsonify({
            'success': True,
            'result': {
                'total_quantity': total_quantity,
                'total_investment': round(total_investment, 2),
                'new_avg_price': round(new_avg_price, 2)
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@tools_bp.route('/calculate-profit', methods=['POST'])
def calculate_profit():
    """주식 코인 수익률 계산기"""
    try:
        data = request.get_json()
        buy_price = float(data.get('buy_price', 0))
        sell_price = float(data.get('sell_price', 0))
        quantity = float(data.get('quantity', 0))
        
        # 수익률 계산
        profit_amount = (sell_price - buy_price) * quantity
        profit_rate = ((sell_price - buy_price) / buy_price * 100) if buy_price > 0 else 0
        
        return jsonify({
            'success': True,
            'result': {
                'profit_amount': round(profit_amount, 2),
                'profit_rate': round(profit_rate, 2)
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@tools_bp.route('/calculate-percent', methods=['POST'])
def calculate_percent():
    """퍼센트 확률 계산기"""
    try:
        data = request.get_json()
        total_value = float(data.get('total_value', 0))
        part_value = float(data.get('part_value', 0))
        
        # 퍼센트 계산
        percentage = (part_value / total_value * 100) if total_value > 0 else 0
        
        return jsonify({
            'success': True,
            'result': {
                'percentage': round(percentage, 2)
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@tools_bp.route('/calculate-dday', methods=['POST'])
def calculate_dday():
    """날짜 경과일 디데이 계산기"""
    try:
        data = request.get_json()
        target_date = data.get('target_date', '')
        
        # 날짜 파싱
        target = datetime.strptime(target_date, '%Y-%m-%d')
        today = datetime.now()
        
        # D-day 계산
        diff = (target - today).days
        
        return jsonify({
            'success': True,
            'result': {
                'dday': diff,
                'message': f"D{diff:+d}" if diff != 0 else "D-Day"
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@tools_bp.route('/generate-lotto', methods=['POST'])
def generate_lotto():
    """로또 조합기 생성기"""
    try:
        data = request.get_json()
        count = data.get('count', 1)
        
        lotto_numbers = []
        for _ in range(count):
            numbers = sorted(random.sample(range(1, 46), 6))
            lotto_numbers.append(numbers)
        
        return jsonify({
            'success': True,
            'result': lotto_numbers
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@tools_bp.route('/roll-dice', methods=['POST'])
def roll_dice():
    """주사위 놀이"""
    try:
        data = request.get_json()
        dice_count = data.get('dice_count', 1)
        sides = data.get('sides', 6)
        
        results = []
        for _ in range(dice_count):
            results.append(random.randint(1, sides))
        
        return jsonify({
            'success': True,
            'result': {
                'dice_results': results,
                'total': sum(results)
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@tools_bp.route('/investment-fortune', methods=['GET'])
def investment_fortune():
    """오늘의 투자운세"""
    try:
        fortunes = [
            "오늘은 투자에 좋은 날입니다! 신중하게 접근하세요.",
            "조금 더 신중한 투자가 필요한 날입니다.",
            "오늘은 관망하는 것이 좋겠습니다.",
            "새로운 투자 기회를 찾아보세요.",
            "기존 포트폴리오를 점검해보는 날입니다."
        ]
        
        today_fortune = random.choice(fortunes)
        
        return jsonify({
            'success': True,
            'result': {
                'fortune': today_fortune,
                'date': datetime.now().strftime('%Y-%m-%d')
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400



@tools_bp.route('/download-video', methods=['POST'])
def download_video():
    """동영상 다운로드 (아프리카TV, 카카오TV, 네이버TV, 트위치 등)"""
    try:
        data = request.get_json()
        url = data.get('url', '')
        platform = data.get('platform', 'auto')  # auto, afreeca, kakao, naver, twitch
        
        # 실제 구현에서는 yt-dlp 등의 라이브러리를 사용해야 함
        # 여기서는 시뮬레이션
        if not url:
            return jsonify({
                'success': False,
                'error': 'URL이 필요합니다.'
            }), 400
        
        # 플랫폼 감지
        if 'afreecatv.com' in url:
            platform = 'afreeca'
        elif 'tv.kakao.com' in url:
            platform = 'kakao'
        elif 'tv.naver.com' in url:
            platform = 'naver'
        elif 'twitch.tv' in url:
            platform = 'twitch'
        
        return jsonify({
            'success': True,
            'result': {
                'message': f'{platform} 플랫폼의 동영상 다운로드가 시작되었습니다.',
                'url': url,
                'platform': platform,
                'note': '실제 구현에서는 yt-dlp 등의 라이브러리를 사용하여 다운로드를 진행합니다.'
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@tools_bp.route('/download-images', methods=['POST'])
def download_images():
    """웹페이지 이미지 다운로드"""
    try:
        data = request.get_json()
        url = data.get('url', '')
        html_content = data.get('html', '')
        min_size = data.get('min_size', 100)  # 최소 이미지 크기 (픽셀)
        
        if not url and not html_content:
            return jsonify({
                'success': False,
                'error': 'URL 또는 HTML 내용이 필요합니다.'
            }), 400
        
        images = []
        
        if url:
            try:
                response = requests.get(url, timeout=10)
                soup = BeautifulSoup(response.content, 'html.parser')
            except Exception as e:
                return jsonify({
                    'success': False,
                    'error': f'웹페이지를 가져올 수 없습니다: {str(e)}'
                }), 400
        else:
            soup = BeautifulSoup(html_content, 'html.parser')
        
        # 이미지 태그 찾기
        img_tags = soup.find_all('img')
        
        for img in img_tags:
            src = img.get('src')
            if src:
                # 상대 경로를 절대 경로로 변환
                if url and src.startswith('/'):
                    from urllib.parse import urljoin
                    src = urljoin(url, src)
                
                images.append({
                    'src': src,
                    'alt': img.get('alt', ''),
                    'title': img.get('title', '')
                })
        
        return jsonify({
            'success': True,
            'result': {
                'images': images,
                'count': len(images),
                'message': f'{len(images)}개의 이미지를 찾았습니다.'
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@tools_bp.route('/generate-ffmpeg', methods=['POST'])
def generate_ffmpeg():
    """FFmpeg 명령어 생성기"""
    try:
        data = request.get_json()
        input_file = data.get('input_file', 'input.mp4')
        output_file = data.get('output_file', 'output.mp4')
        operation = data.get('operation', 'convert')  # convert, resize, compress, extract_audio
        
        # 추가 옵션들
        width = data.get('width', 1920)
        height = data.get('height', 1080)
        bitrate = data.get('bitrate', '1000k')
        fps = data.get('fps', 30)
        audio_codec = data.get('audio_codec', 'aac')
        video_codec = data.get('video_codec', 'libx264')
        
        commands = []
        
        if operation == 'convert':
            cmd = f'ffmpeg -i "{input_file}" -c:v {video_codec} -c:a {audio_codec} "{output_file}"'
            commands.append(cmd)
        
        elif operation == 'resize':
            cmd = f'ffmpeg -i "{input_file}" -vf scale={width}:{height} -c:a copy "{output_file}"'
            commands.append(cmd)
        
        elif operation == 'compress':
            cmd = f'ffmpeg -i "{input_file}" -c:v {video_codec} -b:v {bitrate} -c:a {audio_codec} "{output_file}"'
            commands.append(cmd)
        
        elif operation == 'extract_audio':
            audio_output = output_file.replace('.mp4', '.mp3')
            cmd = f'ffmpeg -i "{input_file}" -vn -acodec {audio_codec} "{audio_output}"'
            commands.append(cmd)
        
        elif operation == 'cut':
            start_time = data.get('start_time', '00:00:00')
            duration = data.get('duration', '00:01:00')
            cmd = f'ffmpeg -i "{input_file}" -ss {start_time} -t {duration} -c copy "{output_file}"'
            commands.append(cmd)
        
        return jsonify({
            'success': True,
            'result': {
                'commands': commands,
                'operation': operation,
                'description': f'{operation} 작업을 위한 FFmpeg 명령어가 생성되었습니다.'
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@tools_bp.route('/word-list', methods=['POST'])
def word_list():
    """글자수별 단어 목록 (영어/한국어)"""
    try:
        data = request.get_json()
        language = data.get('language', 'korean')  # korean, english
        length = data.get('length', 3)
        contains = data.get('contains', '')
        starts_with = data.get('starts_with', '')
        ends_with = data.get('ends_with', '')
        
        # 샘플 단어 목록 (실제로는 데이터베이스나 파일에서 가져와야 함)
        if language == 'korean':
            sample_words = [
                '사과', '바나나', '포도', '딸기', '수박', '참외', '복숭아', '자두',
                '컴퓨터', '키보드', '마우스', '모니터', '스피커', '헤드폰',
                '학교', '도서관', '교실', '운동장', '급식실', '보건실',
                '가족', '친구', '선생님', '학생', '부모님', '형제',
                '음식', '밥', '국', '반찬', '김치', '라면', '피자', '햄버거'
            ]
        else:
            sample_words = [
                'apple', 'banana', 'grape', 'strawberry', 'watermelon', 'peach',
                'computer', 'keyboard', 'mouse', 'monitor', 'speaker', 'headphone',
                'school', 'library', 'classroom', 'playground', 'cafeteria',
                'family', 'friend', 'teacher', 'student', 'parent', 'sibling',
                'food', 'rice', 'soup', 'pizza', 'hamburger', 'sandwich'
            ]
        
        # 필터링
        filtered_words = []
        for word in sample_words:
            if len(word) == length:
                if contains and contains not in word:
                    continue
                if starts_with and not word.startswith(starts_with):
                    continue
                if ends_with and not word.endswith(ends_with):
                    continue
                filtered_words.append(word)
        
        return jsonify({
            'success': True,
            'result': {
                'words': filtered_words,
                'count': len(filtered_words),
                'language': language,
                'length': length
            }
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

