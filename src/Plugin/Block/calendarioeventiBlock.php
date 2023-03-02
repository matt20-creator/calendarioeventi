<?php

namespace Drupal\calendarioeventi\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'calendarioeventiBlock' block.
 *
 * @Block(
 *  id = "calendarioeventi_block",
 *  admin_label = @Translation("Calendarioeventi block"),
 * )
 */
class calendarioeventiBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

      return [
          '#theme' => 'calendarioeventi',
          '#type' => 'markup',
          '#markup' => $this->t('Implement method: hello'),
          '#attached' => [
              'library' => [
                  'calendario_eventi/calendario_eventi'
              ],
          ],
      ];

  }



}
