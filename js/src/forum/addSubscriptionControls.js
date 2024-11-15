import IndexSidebar from 'flarum/forum/components/IndexSidebar';
import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Model from 'flarum/common/Model';
import SubscriptionModal from './components/SubscriptionModal';
import SubscriptionStateButton from './components/SubscriptionStateButton';

export default () => {
  app.store.models.tags.prototype.subscription = Model.attribute('subscription');

  extend(IndexSidebar.prototype, 'items', function (items) {
    if (!app.currentTag() || !app.session.user) return;

    const tag = app.currentTag();

    if (items.has('newDiscussion')) items.setPriority('newDiscussion', 10);

    items.add(
      'subscriptionButton',
      <SubscriptionStateButton
        className="Button App-primaryControl"
        subscription={tag.subscription()}
        onclick={() => app.modal.show(SubscriptionModal, { model: tag })}
      />,
      5
    );
  });
};
