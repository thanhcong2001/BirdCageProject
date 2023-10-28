import { Rating } from '@mui/material';
import { Button } from 'antd';
import { DateTime } from 'luxon';
import { useState } from 'react';
import useCommentPost from './useCommentPost';
const CommentSection = ({ id, reviews }) => {
    const token = localStorage.getItem('token');

    const [feedback, setFeedback] = useState('');
    const [star, setStar] = useState(0);
    const { comment, isPending } = useCommentPost()
    const dateConvert = (date) => {
        const formattedDate = DateTime.fromISO(date).toRelative();
        return formattedDate
    }

    const handleReview = async (e) => {
        const feedbackObj = {
            id: id,
            rating: star,
            reviewText: feedback
        }
        await comment(feedbackObj)
    }


    return (
        <div>
            {reviews?.length > 0 ?
                <>
                    <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>COMMENTS</h2>
                    {reviews?.map((cmt) => (
                        <div key={cmt.id} className='comment-section'
                            style={{
                                display: 'flex',
                                gap: 20,
                                paddingTop: 20,
                                marginLeft: 20,
                                marginRight: 20,
                                marginBottom: 20,
                                alignItems: 'center',
                            }}>
                            <div className='avatar' >
                                <img style={{
                                    display: 'flex',
                                    verticalAlign: 'middle',
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                }} src="https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg" alt="hinh anh" />
                            </div>
                            <div className='block-content' >
                                <div className="user-name" style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: "20px"
                                }}>
                                    <div className="name" style={{
                                        fontWeight: 'bold',
                                    }}  >
                                        {cmt.lastName}
                                    </div>
                                    <div className="rating-star">
                                        <Rating
                                            value={cmt.rating}
                                            readOnly
                                        // onChange={(event, newValue) => {
                                        //     setStars(newValue);
                                        // }}
                                        />
                                    </div>

                                </div>
                                <div className="comment-content" style={{ fontSize: '15px', color: 'GrayText' }}>{cmt.reviewText}</div>
                                <div className="comment-time" style={{ fontSize: '15px', color: 'GrayText' }}>{dateConvert(cmt.reviewDate)}</div>
                            </div>
                        </div>
                    ))}

                </> :
                <div style={{ marginLeft: 20 }}>
                    <p style={{ fontSize: 22, fontWeight: 'bold' }}>Đánh giá</p>
                    <p>Chưa có đánh giá nào.</p>
                </div>}

            <form className='form-feedBackCage' >
                <p style={{ fontSize: 15, fontWeight: 'bold' }}>Nhận xét của bạn *</p>
                <div className="comment-user-section" style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <input
                        className='input-feedBack'
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <Rating
                        value={star}
                        onChange={(event, newValue) => {
                            setStar(newValue);
                        }}
                    />
                </div>
                {token ? <Button onClick={handleReview} loading={isPending} style={{
                    backgroundColor: '#64be43',
                    color: '#fff',
                    marginTop: '20px',
                }}>

                    Gửi Đi
                </Button> : <Button disabled style={{
                    backgroundColor: '#64be43',
                    color: '#fff',
                    marginTop: '20px',
                    opacity: 0.5
                }}>

                    Đăng nhập để đánh giá sản phẩm
                </Button>}

            </form>
        </div>
    )
}

export default CommentSection