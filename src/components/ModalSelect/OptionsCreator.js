import $ from 'jquery';
import IScroll from 'iscroll/build/iscroll';

import DeviceDetect from 'shared/device/DeviceDetect';

import PositionCalculate from './PositionCalculate';

export const NativeOptionCreater = {
  render() {
    const that = this;
    const { options, valueKey, labelKey, disableOption, onClick, name } = this.props;
    const defaultValue = this.state.value;
    const callback = this.handleClickOption;

    if (options && options.length > 0) {
      let $select = that.$select;

      if (!that.$select) {
        $select = $(document.createElement('select')).addClass('md-native-select');

        if (typeof onClick === 'function' && DeviceDetect.isMobile) {
          $select.on('click', () => onClick(name));
        }

        $select.change((e) => {
          const $target = $(e.target);

          // 避免 options 用到舊的
          callback(that.props.options[$target.val()]);
        });

        $(this.selectContainer).append($select);
        this.$select = $select;
      } else {
        $select.empty();
      }

      let isSetDefaultValue = false;
      options.forEach((option, index) => {
        const $option = $(document.createElement('option'));
        const fitText = option.fitText;
        const defaultText = option[labelKey];
        const soldOutText = option.soldOutText || '';
        let optionText = fitText ? `${defaultText} (${fitText})` : defaultText;
        optionText = `${optionText} ${soldOutText}`;

        $option.val(index).text(optionText);

        if ((disableOption && index === 0) || option.disabled) {
          $option.attr('disabled', 'disabled');
        }
        $select.append($option);

        if (option[valueKey] === defaultValue) {
          isSetDefaultValue = true;
          $select.val(index);
        }
      });

      if (!isSetDefaultValue) {
        $select.prepend($('<option selected disabled hidden value="" />'));
      }
    }
  },
  updateValue() {
    if (this.$select) {
      const { options, valueKey } = this.props;
      const defaultValue = this.state.value;

      for (let i = 0, count = options.length; i < count; i += 1) {
        if (options[i][valueKey] == defaultValue) {
          this.$select.val(i);
          return false;
        }
      }
    }
  },
  update() {
    NativeOptionCreater.render.apply(this);
  },
  updatePosition() { },
  show() {
    // do nothing
  },
  close() {
    // do nothing
  },
  destroy() {
    // do nothing
  },
};


export const DropDownOptionsCreater = {
  render() {
    // do nothing
  },
  renderSelectLazy() {
    const that = this;
    const { options, valueKey, labelKey, disableOption, zIndex, menuClassName } = this.props;
    const defaultValue = this.state.value;
    const callback = this.handleClickOption;

    if (options && options.length > 0) {
      const $select = $(document.createElement('div')).addClass(`md-select-menu ${menuClassName}`);
      const $content = $(document.createElement('div')).addClass('md-select-menu-content');
      const $iscrollWrap = $('<div class="md-select-scroller-wrap"></div>');

      if (zIndex > 0) {
        $select.css('z-index', zIndex);
      }

      $content.delegate('.md-options', 'click', (e) => {
        const $target = $(e.currentTarget);
        const disabled = $target.attr('disabled');
        if (disabled === 'disabled') {
          return;
        }

        if (that.$selectedOption) {
          that.$selectedOption.removeAttr('selected');
        }
        that.$selectedOption = $target.attr('selected', true);
        callback(options[$target.attr('data-index')]);
      });

      options.forEach((option, index) => {
        const $option = $(document.createElement('div')).addClass('md-options');
        const $text = $(document.createElement('div')).addClass('md-text').text(option[labelKey]);

        if (option[valueKey] == defaultValue) {
          that.$selectedOption = $option;
          $option.attr('selected', true);
        }

        $option.attr('data-index', index).append($text);

        if (disableOption && index === 0) {
          $option.attr('disabled', 'disabled');
        }

        if (option.disabled) {
          $option.attr('disabled', 'disabled');
          $option.css('cursor', 'not-allowed');
        }

        $content.append($option);
      });

      $iscrollWrap.append($content);
      $select.append($iscrollWrap);

      $('body').append($select);

      this.iscroll = new IScroll($iscrollWrap[0], {
        mouseWheel: true,
        scrollbars: true,
        fadeScrollbars: false,
        interactiveScrollbars: true,
        click: false,
      });

      this.$select = $select;
      this.$selectContent = $content;
    }
  },
  scrollToSelectOption() {
    if (this.$selectContent && this.$selectedOption) {
      this.iscroll.scrollToElement(this.$selectedOption[0], '0s', false, true);
    }
  },
  updateValue() {
    if (this.$select) {
      const that = this;
      const { options, valueKey } = this.props;
      const defaultValue = this.state.value;
      let selectedIndex;

      for (let i = 0, count = options.length; i < count; i += 1) {
        if (options[i][valueKey] == defaultValue) {
          selectedIndex = i;
          break;
        }
      }

      this.$selectedOption.removeAttr('selected');
      this.$select.find('.md-options').each((index, elem) => {
        const $elem = $(elem);

        if ($elem.attr('data-index') == selectedIndex) {
          that.$selectedOption = $elem;
          $elem.attr('selected', true);
          return false;
        }
      });
    }
  },
  update() {
    if (this.$select) {
      this.$select.remove();
      this.$select = '';
    }
  },
  updatePosition() {
    if (!this.$select) {
      return;
    }
    const position = PositionCalculate.getFloatPosition(this.$select, $(this.selectContainer), $(window));
    this.$select.css({ left: position.left, top: position.top });
  },
  show() {
    if (!this.$select) {
      DropDownOptionsCreater.renderSelectLazy.apply(this);
    }

    DropDownOptionsCreater.updatePosition.apply(this);
    this.$select.addClass('md-select-menu-active');
    this.iscroll.refresh();

    DropDownOptionsCreater.scrollToSelectOption.apply(this);
  },
  close() {
    if (this.$select) {
      this.$select.removeClass('md-select-menu-active');
    }
  },
  destroy() {
    if (this.$select) {
      this.$select.remove();
    }
  },
};

export const AutoWidthOptionsCreater = {
  render() {
    // do nothing
  },
  renderSelectLazy() {
    const that = this;
    const { options, valueKey, labelKey, zIndex, menuClassName } = this.props;
    const defaultValue = this.state.value;
    const callback = this.handleClickOption;

    if (options && options.length > 0) {
      const $select = $(document.createElement('div')).addClass(`md-select-menu md-white-theme ${menuClassName}`);
      const $content = $(document.createElement('div')).addClass('md-select-menu-content');

      if (zIndex > 0) {
        $select.css('z-index', zIndex);
      }

      $content.delegate('.md-options-autoWidth', 'click', (e) => {
        const $target = $(e.currentTarget);
        const disabled = $target.attr('disabled');
        if (disabled === 'disabled') {
          return;
        }

        if (that.$selectedOption) {
          that.$selectedOption.removeAttr('selected');
        }

        that.$selectedOption = $target.attr('selected', true);
        callback(options[$target.attr('data-index')]);
      });

      options.forEach((option, index) => {
        const fitText = option.fitText;
        const $option = $(document.createElement('div')).addClass('md-options md-options-autoWidth');
        const $text = $(document.createElement('div')).addClass('md-text').text(option[labelKey]);
        const $fitText = $(document.createElement('div')).addClass('md-text md-fit-text').text(fitText);

        if (option[valueKey] == defaultValue) {
          that.$selectedOption = $option;
          $option.attr('selected', true);
          $option.attr('fit', true);
        }

        $option.attr('data-index', index).append($text);

        if (option.disabled) {
          $option.attr('disabled', 'disabled');
          $option.css('cursor', 'not-allowed');
        }

        if (option.soldOutText) {
          $option.css('text-decoration', 'line-through');
        }

        if ($fitText) {
          $option.append($fitText);
        }

        $content.append($option);
      });

      $select.append($content);
      $('body').append($select);

      this.$select = $select;
      this.$selectContent = $content;
    }
  },
  scrollToSelectOption() {
    if (this.$selectContent && this.$selectedOption) {
      const top = this.$selectedOption.position().top;
      this.$selectContent.scrollTop(this.$selectContent.scrollTop() + top);
    }
  },
  updateValue() {
    if (this.$select) {
      const that = this;
      const { options, valueKey } = this.props;
      const defaultValue = this.state.value;
      let selectedIndex;

      for (let i = 0, count = options.length; i < count; i += 1) {
        if (options[i][valueKey] == defaultValue) {
          selectedIndex = i;
          break;
        }
      }

      this.$selectedOption.removeAttr('selected');
      this.$select.find('.md-options').each((index, elem) => {
        const $elem = $(elem);

        if ($elem.attr('data-index') == selectedIndex) {
          that.$selectedOption = $elem;
          $elem.attr('selected', true);
          return false;
        }
      });
    }
  },
  update() {
    if (this.$select) {
      this.$select.remove();
      this.$select = '';
    }
  },
  updatePosition() {
    if (!this.$select) {
      return;
    }
    const position = PositionCalculate.getFloatBottomPosition(this.$select, $(this.selectContainer), $(window));
    this.$select.css({ left: position.left, top: position.top, width: position.width });
    this.$select.addClass(`md- align - ${position.align}`);
  },
  show() {
    if (!this.$select) {
      AutoWidthOptionsCreater.renderSelectLazy.apply(this);
    }

    AutoWidthOptionsCreater.updatePosition.apply(this);
    this.$select.addClass('md-select-menu-active');
    AutoWidthOptionsCreater.scrollToSelectOption.apply(this);
  },
  close() {
    if (this.$select) {
      this.$select.removeClass('md-select-menu-active');
    }
  },
  destroy() {
    if (this.$select) {
      this.$select.remove();
    }
  },
};
