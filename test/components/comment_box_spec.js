import { renderComponent , expect } from '../test_helper';
import CommentBox from '../../src/components/comment_box';


describe('Comment Box', () => {
  it('Has a textarea', () => {
    const component = renderComponent(CommentBox);
  });
  it('Has a button', () => {
    const component = renderComponent(CommentBox);
  });
});
